export type CodeEditor = {
    lang: string,
    basic_code: string
}

export type languageName = "Javascript";
export const LANGUAGE: Record<languageName, CodeEditor> = {
    "Javascript": {
        basic_code: `var twoSum = function(nums, target) {
    // Write your code here   
};`,
        lang: "javascript"
    }
}
