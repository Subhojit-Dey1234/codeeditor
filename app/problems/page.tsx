"use client";

import { DropDown } from "@/components/Utils/dropdown";
import ProblemParser from "@/components/Utils/problem_parser";
import TestCaseContainer from "@/components/Utils/testcase_container";
import { LANGUAGE, languageName } from "@/components/Types/CodeEditor";
import { OutputResult } from "@/components/Types/OutputResult";
import Editor from "@monaco-editor/react";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [flag, setFlag] = useState<boolean>(false);
  const [language, setLanguage] = useState<languageName>("Javascript")
  const [code, setCode] = useState<string | undefined>("");
  const [test_output, setTestOutput] = useState<OutputResult[]>([])
  const [error_output, setErrorOutput] = useState<OutputResult | null>(null)

  function handleEditor(value: string | undefined, event: any) {
    setCode(value);
  }

  function handleRunCode() {
    axios.post("/api/run_test/",JSON.stringify(code))
    .then((res)=>{
      if(res.status === 200){
        setTestOutput(res.data.data);
        setErrorOutput(null);
      }
    })
    .catch((err)=>{
      const {data} = err.response.data;
      setErrorOutput(data)
    })
  }

  const language_layout = LANGUAGE[language]

  return (
    <div style={{ background: "#1b1b1b" }}>
      <div className="w-screen py-1 flex justify-center">
        <button className="bg-lime-600 px-6 py-1 rounded-l" onClick={handleRunCode}>Run</button>
        <button className="bg-indigo-500 px-6 py-1 rounded-r">Submit</button>
      </div>
      <div className="flex flex-row w-screen font-sans black">
        <div
          style={{
            width: "50vw",
            height: "95vh",
            padding: "20px",
            background: "#161515",
          }}
          className="border-[#717171]	border rounded m-1"
        >
          <ProblemParser/>
        </div>
        <div
          className=""
          style={{ width: "50vw", height: "95vh", background: "#161515" }}
        >
          <div className="h-14 w-full flex flex-row items-center">
            <span className="font-sans text-xs uppercase text-center ml-2 relative">
              <p className="cursor-pointer" onClick={()=>setFlag(!flag)}>{language}</p>
              <DropDown setLanguage={setLanguage} setFlag={setFlag} flag={flag}/>
            </span>
          </div>
          <Editor
            height="47.5vh"
            defaultLanguage={language_layout.lang}
            defaultValue={language_layout.basic_code.toString()}
            onChange={handleEditor}
            language={language_layout.lang}
            value={language_layout.basic_code.toString()}
            theme="vs-dark"
          />
          <div
            style={{ height: "calc(50% - 52px)" }}
            className="w-full border-[#717171] border rounded"
          >
            <TestCaseContainer error_output={error_output} test_output={test_output} language={language}/>
          </div>
        </div>
      </div>
    </div>
  );
}
