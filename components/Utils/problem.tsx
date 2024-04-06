import { CustomCodeBlock, CustomInlineCode } from "@/components/Utils/code";
import { CustomHeader, CustomHeader2 } from "@/components/Utils/header";
import CustomParagraph from "@/components/Utils/paragraph";

export function PromblemStatementContainer() {
  return (
    <>
      <CustomHeader>Two Sum</CustomHeader>
      <CustomParagraph>
        Given an array of integers <CustomInlineCode>nums</CustomInlineCode> and
        an integer <CustomInlineCode>target</CustomInlineCode>, return indices
        of the two numbers such that they add up to target. You may assume that
        each input would have exactly one solution, and you may not use the same
        element twice.
      </CustomParagraph>
      <CustomParagraph>
        You may assume that each input would have exactly one solution, and you
        may not use the same element twice.
      </CustomParagraph>
      <CustomParagraph>You can return the answer in any order.</CustomParagraph>

      <div style={{ margin: "40px 0" }}>
        <CustomHeader2>Example 1</CustomHeader2>
        <CustomParagraph>
          <CustomCodeBlock codeblock={"Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1]."} />
        </CustomParagraph>
      </div>

      <div style={{ margin: "40px 0" }}>
        <CustomHeader2>Example 2</CustomHeader2>
        <CustomParagraph>
          <CustomCodeBlock codeblock={"Input: nums = [3,2,4], target = 6\nOutput: [1,2]"} />
        </CustomParagraph>
      </div>

      <div style={{ margin: "40px 0" }}>
        <CustomHeader2>Example 3</CustomHeader2>
        <CustomParagraph>
          <CustomCodeBlock codeblock={"Input: nums = [3,3], target = 6\nOutput: [0,1]"} />
        </CustomParagraph>
      </div>
    </>
  );
}
