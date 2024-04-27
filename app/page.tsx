"use client";

import { Question } from "@/backend/types/Questions";
import { DropDown } from "@/components/Utils/Dropdown";
import { PromblemStatementContainer } from "@/components/Utils/problem";
import Editor from "@monaco-editor/react";
import { useState } from "react";

const question: Question = {
  id: "",
  basic_code: "var twoSum = function(nums, target) {\n\n};",
};

export default function Home() {
  const [flag, setFlag] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("Javascript")
  const [code, setCode] = useState<string | undefined>("");

  function handleEditor(value: string | undefined, event: any) {
    setCode(value);
  }

  function handleRunCode() {
    fetch("/api/run_test/", {
      method: "POST",
      body: JSON.stringify(code),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  }

  return (
    <div style={{ background: "#1b1b1b" }}>
      <div className="w-screen py-3 flex justify-center">
        <button className="bg-lime-600 px-6 py-1 rounded-l">Run</button>
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
          className="border-slate-700	border-2 rounded-lg m-1"
        >
          <PromblemStatementContainer />
        </div>
        <div
          className=""
          style={{ width: "50vw", height: "95vh", background: "#161515" }}
        >
          <div className="h-14 w-full flex flex-row items-center">
            <span className="font-sans text-xs uppercase text-center ml-2 relative">
              <p className="cursor-pointer" onClick={()=>setFlag(!flag)}>{language}</p>
              <DropDown setLanguage={setLanguage} flag={flag}/>
            </span>
          </div>
          <Editor
            height="47.5vh"
            defaultLanguage="javascript"
            defaultValue={question.basic_code.toString()}
            onChange={handleEditor}
            theme="vs-dark"
          />
          <div
            style={{ height: "calc(50% - 56px)" }}
            className="w-full border-slate-700 border-2 rounded-lg"
          ></div>
        </div>
      </div>
    </div>
  );
}
