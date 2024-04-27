import { Suspense, useEffect, useState } from "react";
import { test_cases } from "../constants/TestCase"

export default function TestCaseContainer({test_output, language}) {
    const [ind, setInd] = useState(0);
    const [test_cases_state, setTestCases] = useState<string[][]>([[]]);

    useEffect(() => {
        let input_cases: string[][] = [];
        for (let test_case of test_cases) {
            const a = test_case.input.split("\n6").map((t) => t.trim());
            input_cases = input_cases.concat([a]);
        }
        setTestCases(input_cases)
    }, [test_cases])

    return (
        <div>
            <Suspense fallback={<p>"Loading...."</p>}>
                {/* <div className="block flex justify-center items-center w-full h-14 bg-gray-800">
                    <span className="w-full h-full cursor-pointer border text-center flex items-center justify-center border-gray-600">Test Case</span>
                    <span className="w-full h-full cursor-pointer border text-center flex items-center justify-center border-gray-600">Output</span>
                </div> */}
                <div className="relative top-2 h-20 flex">
                    {test_cases_state.map((_, ind) => (
                        <span key={ind} className="cursor-pointer bg-gray-700 w-20 h-10 m-auto flex items-center justify-center rounded" onClick={() => setInd(ind)}>Test {ind + 1} </span>
                    ))}
                </div>
                <div className="relative w-full h-[5rem]">
                    <h6 className="mx-4 uppercase text-gray-400">Input</h6>
                    {test_cases_state[ind].map((input_case, idx) => (
                        <code key={idx} className="block bg-gray-700 h-10 p-2 rounded m-4">{input_case}</code>
                    ))}
                    <h6 className="mx-4 uppercase text-gray-400">Output</h6>
                    <code className="block bg-gray-700 h-10 p-2 rounded m-4">{ test_output.length > 0 ? test_output[ind].stdout : ""}</code>
                </div>
            </Suspense>
        </div>
    )
}