import { NextResponse } from "next/server";
import type { NextRequest } from "next/server"; 
import type {TestCase } from "@/backend/types/Questions.ts"
import fs from 'fs';
import { randomUUID } from "crypto";
import { exec } from "child_process";
import { OutputResult } from "@/components/Types/OutputResult";


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
    // @TODO - Take input from the Databases
    // Get the function name
    const test_cases: TestCase[] = [
      {
        question_id: unique_id + '1',
        default_code: "\nvar res = twoSum([2,7,11,15],9);\n\nconsole.log(res)\n",
        result: "6"
      },
      {
        question_id: unique_id + '2',
        default_code: "\nvar res = twoSum([3,2,4],6);\n\nconsole.log(res)\n",
        result: "9"
      },
      {
        question_id: unique_id + '3',
        default_code: "\nvar res = twoSum([3,3],6);\n\nconsole.log(res)\n",
        result: "6"
      }
    ]


    let stdout_res: OutputResult[] = [] 

    for(let test_case of test_cases){
      const written_code = `${rq}${test_case.default_code}`
      const file = `solution-${unique_id}.js`
      await fs.writeFileSync(`codes/${file}`, written_code);
      const docker_command = `docker cp codes/${file} codeeditor:/codefiles && docker exec codeeditor node codefiles/${file}`
      const stdout: OutputResult = await execPromise(docker_command);
      stdout_res.push(stdout);
    }
    return NextResponse.json({data: stdout_res})
  }catch(e){
    return NextResponse.json({data: e},{status: 400})
  }
}