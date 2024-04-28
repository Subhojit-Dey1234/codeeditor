import { Question, TestCase } from "../Types/TestCase";

export const question_header: string = "TWO SUM";
export const brief_description: string = "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.You may assume that each input would have exactly one solution, and you may not use the same element twice.<br/><br/> You can return the answer in any order."
export const test_cases: TestCase[] = [
        {
            header: "Test 1",
            explanation: `
            Input: nums = [2,7,11,15], target = 9
            Output: [0,1]
            Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
            `,
            input: "[2,7,11,15] \n6 9",
            output: "[0,1]"
        },
        {
            header: "Test 2",
            explanation: `
            Input: nums = [3,2,4], target = 6
            Output: [1,2]
            `,
            input: "[3,2,4] \n6 6",
            output: "[1,2]"
        },
        {
            header: "Test 3",
            explanation: `
            Input: nums = [3,3], target = 6
            Output: [0,1]
            `,
            input: "[3,3] \n6 6",
            output: "[0,1]"
        }
    ]


export const constraints = [
    "2 <= nums.length <= 10^4",
    "-10^9 <= nums[i] <= 10^9",
    "-10^9 <= target <= 10^9"
]


export const QUESTION: Question = {
    fn: "twoSum",
    input_params_name: ["nums", "target"],
    test_cases: [
        {
            input:["[3,3]","6"],
            output: ["[0,1]"]
        }
    ]
}