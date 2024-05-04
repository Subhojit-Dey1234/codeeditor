export type TestCase = {
    header: string,
    explanation: string,
    input: string,
    output: string,
}

type ResultType = {
    input: string[]
    output: string[]
}


export type Question = {
    fn : string,
    input_params_name: string[]
    test_cases: ResultType[],
    basic_code: string 
}