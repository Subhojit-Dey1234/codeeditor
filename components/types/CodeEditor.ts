export type CodeEditor = {
    lang: string,
    basic_code: string
}

// const list = ["Java", "Javascript", "C++", "Python"];

export type languageName = "Javascript" | "C++" | "Python"


export const LANGUAGE: Record<languageName, CodeEditor> = {
    "Javascript": {
        basic_code: `var twoSum = function(nums, target) {
    // Write your code here   
};`,
        lang: "javascript"
    },
    "C++": {
        basic_code:
            `vector<int> twoSum(vector<int> nums, int target){
    // Write your code here.
}`,
        lang: "cpp"
    },
    "Python": {
        basic_code: `def twoSum(nums, target):
    # Write your code`,
        lang: "python"
    }
}
