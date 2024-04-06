import { NextResponse } from "next/server";
import type { NextRequest } from "next/server"; 
import type {TestCase } from "@/backend/types/Questions.ts"
import fs from 'fs';
import { randomUUID } from "crypto";
import { exec } from "child_process";


const execPromise = (command: string) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      const output_string: string = stdout.replace(/\s/g, '').replace('\n','');
      resolve(output_string);
    });
  });
};


export async function POST(request: NextRequest) {
  try{
    const rq: Promise<any> = await request.json();
    const unique_id: String = randomUUID();

    const test_cases: TestCase[] = [
      {
        question_id: unique_id + '1',
        default_code: "\nvar res = twoSum([2,7,11,15],9);\n\nconsole.log(JSON.stringify(res) === JSON.stringify([0,1]))\n",
        result: "6"
      },
      {
        question_id: unique_id + '2',
        default_code: "\nvar res = twoSum([3,2,4],6);\n\nconsole.log(JSON.stringify(res) === JSON.stringify([1,2]))\n",
        result: "9"
      },
      {
        question_id: unique_id + '3',
        default_code: "\nvar res = twoSum([3,3],6);\n\nconsole.log(JSON.stringify(res) === JSON.stringify([0,1]))\n",
        result: "6"
      }
    ]


    const written_code = `${rq}${test_cases[0].default_code}`
    const file = `solution-${unique_id}.js`
    await fs.writeFileSync(`codes/${file}`, written_code);
    const docker_command = `docker build -t codeeditor-${unique_id} --build-arg FILE_PATH=${file} . && docker run -e FILE_PATH=${file} codeeditor-${unique_id}`;
    const stdout = await execPromise(docker_command);

    return NextResponse.json({success_message: stdout})
  }catch(e){
    console.log(e)
    return NextResponse.json({data: e})
  }
}