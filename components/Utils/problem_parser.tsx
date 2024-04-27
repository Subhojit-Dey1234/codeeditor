import type { TestCase } from "@/components/types/TestCase";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { brief_description, constraints, question_header, test_cases } from "../constants/TestCase";



export default function ProblemParser() {
    let test_cases_str = "";
    for (let ex of test_cases) {
        test_cases_str += `#### ${ex.header.toUpperCase()}\n\n${ex.explanation}\n`
    }
    let constraints_str = "";
    for (let constraint of constraints) {
        constraints_str += `- \`${constraint}\` \n`
    }
    const result = `## ${question_header}\n ${brief_description} \n\n${test_cases_str} \n\n #### CONSTRAINTS\n ${constraints_str}`

    return (
        <>
            <MarkdownEditor.Markdown source={result} />
        </>
    )
}