import { Suspense, useEffect, useState } from "react";
import { test_cases } from "../constants/TestCase";
import { OutputResult } from "../Types/OutputResult";
import { languageName } from "../Types/CodeEditor";
import { QUESTION } from "../constants/TestCase";

type IProps = {
  test_output?: OutputResult[];
  language?: languageName;
  flag?: boolean;
  error_output?: OutputResult | null;
};

function ResultContainer(props: IProps) {
  const { flag } = props;
  return (
    <>
      {!flag ? (
        <span className="border border-red-600 rounded px-3 py-1 bg-red-300 text-red-600">
          FAILED
        </span>
      ) : (
        <span className="border border-green-500 rounded px-3 py-1 bg-green-100 text-green-500">
          SUCCESS
        </span>
      )}
    </>
  );
}

export default function TestCaseContainer({
  error_output,
  test_output,
  language,
}: IProps) {
  const [ind, setInd] = useState(0);
  const [test_cases_state, setTestCases] = useState<string[][]>([[]]);
  const [toggle, setToggle] = useState<boolean>(true);

  let flag = null;

  useEffect(() => {
    let input_cases: string[][] = [];
    for (let test_case of QUESTION.test_cases) {
      const a = test_case.input.map((t) => t.trim());
      input_cases = input_cases.concat([a]);
    }
    setTestCases(input_cases);
  }, []);

  if (test_output?.length !== undefined && test_output?.length > 0) {
    flag =
      JSON.stringify(test_output[ind].stdout) ===
      JSON.stringify(test_cases[ind].output);
  }

  return (
    <div>
      <Suspense fallback={<p>{"Loading...."}</p>}>
        <div className="flex justify-center items-center w-full h-12 bg-gray-800">
          <span
            className="w-full h-full border text-center flex items-center justify-center border-gray-600 cursor-pointer"
            onClick={() => setToggle(true)}
          >
            Test Case
          </span>
          <span
            className="w-full h-full border text-center flex items-center justify-center border-gray-600 cursor-pointer"
            onClick={() => setToggle(false)}
          >
            Test Result
          </span>
        </div>
        {toggle && (
          <div>
            <div className="relative top-2 h-full flex">
              {test_cases_state.map((_, ind) => (
                <span
                  key={ind}
                  className="cursor-pointer bg-gray-700 w-20 h-10 m-auto flex items-center justify-center rounded"
                  onClick={() => setInd(ind)}
                >
                  Test {ind + 1}{" "}
                </span>
              ))}
            </div>
            <div className="relative w-full h-[5rem]">
              <h6 className="mx-4 uppercase text-gray-400">Input</h6>
              {test_cases_state[ind].map((input_case, idx) => (
                <code
                  key={idx}
                  className="block bg-gray-700 h-10 p-2 rounded m-4"
                >
                  {input_case}
                </code>
              ))}
            </div>
          </div>
        )}
        {!toggle && (
          <>
            {error_output?.stderr && (
              <div>
                <div className="relative top-2 h-[23rem] flex">
                  <code className="block bg-gray-900 h-full w-full p-2 rounded m-2 overflow-hidden">
                    <span className="text-red-500">
                      {JSON.parse(error_output.stderr)}
                    </span>
                  </code>
                </div>
              </div>
            )}
            {!error_output?.stderr && (
              <div>
                <div className="relative top-2 h-full flex">
                  {test_cases_state.map((_, ind) => (
                    <span
                      key={ind}
                      className="cursor-pointer bg-gray-700 w-20 h-10 m-auto flex items-center justify-center rounded"
                      onClick={() => setInd(ind)}
                    >
                      Test {ind + 1}{" "}
                    </span>
                  ))}
                </div>
                {flag !== null && (
                  <>
                    {flag ? (
                      <h3 className="relative block m-4 text-green-400 text-2xl">
                        ACCEPTED
                      </h3>
                    ) : (
                      <h3 className="relative block m-4 text-red-400 text-2xl">
                        ERROR
                      </h3>
                    )}
                  </>
                )}
                {!error_output?.stderr && (
                  <div className="relative w-full h-[5rem]">
                    <h6 className="mx-4 uppercase text-gray-400">Input</h6>
                    {test_cases_state[ind].map((input_case, idx) => (
                      <code
                        key={idx}
                        className="block bg-gray-700 h-10 p-2 rounded m-4"
                      >
                        {input_case}
                      </code>
                    ))}
                    <h6 className="mx-4 uppercase text-gray-400">Output</h6>
                    <code className="block bg-gray-700 h-10 p-2 rounded m-4">
                      {test_output?.length !== undefined &&
                      test_output?.length > 0
                        ? test_output[ind].stdout
                        : ""}
                    </code>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </Suspense>
    </div>
  );
}
