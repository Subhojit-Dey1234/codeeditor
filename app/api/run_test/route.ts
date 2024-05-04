import { NextResponse } from "next/server";
import type { NextRequest } from "next/server"; 
import type {TestCase } from "@/backend/types/Questions.ts"
import fs from 'fs';
import { randomUUID } from "crypto";
import { exec } from "child_process";
import { OutputResult } from "@/components/Types/OutputResult";
import { QUESTION } from "@/components/constants/TestCase";
import { Question } from "@/components/Types/TestCase";

function create_execution_function(ind: number , question: Question, input_params: string[]){
  return `const res_${ind} = ${question.fn}(${input_params}); \n console.log(res_${ind}); console.log("$@")`;
}


const execPromise = (command: string) => {
  return new Promise<OutputResult>((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if(error){
        const error_response: OutputResult = {
          stderr: JSON.stringify(stderr),
          error: JSON.stringify(error)
        }
        reject(error_response)
      }
      const result: string = stdout.replace(/\s/g, '').replace('\n','');
      const console_statement: string = stderr.replace(/\s/g, '').replace('\n','');

      const response: OutputResult = {
        stderr : console_statement,
        stdout : result
      }
      resolve(response);
    });
  });
};


export async function POST(request: NextRequest) {
  try{
    const rq: Promise<any> = await request.json();
    const unique_id: String = randomUUID();
    const question: Question = QUESTION;
    let stdout_res: OutputResult[] = [];

    let execution_fn = "";

    for(let i = 0; i < question.test_cases.length; i++){
      let test_case = question.test_cases[i];
      execution_fn += `${create_execution_function(i,question,test_case.input)} \n`;
    }

    const written_code = `${rq}\n${execution_fn}`
    const file = `solution-${unique_id}.js`
    await fs.writeFileSync(`codes/${file}`, written_code);
    const docker_command = `docker cp codes/${file} codeeditor:/codefiles && docker exec codeeditor node codefiles/${file}`
    const stdout: OutputResult = await execPromise(docker_command);
    const stdout_arr: string[] | undefined = stdout.stdout?.split("$@");

    if(stdout_arr !== undefined){
      for(let r of stdout_arr){
        if(r.length === 0) continue;

        const q: OutputResult = {
          stdout: r
        }
        stdout_res.push(q);
      }
    }
    return NextResponse.json({data: stdout_res})
  }catch(e){
    return NextResponse.json({data: e},{status: 500})
  }
}