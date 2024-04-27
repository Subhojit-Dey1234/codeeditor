import React from "react";
type Props = { children?: React.ReactNode; codeblock?: string };

export const CustomInlineCode: React.FC<Props> = ({ children }) => {
  return (
    <code className="text-base border-[#717171] border px-1 py-0.5 rounded text-slate-200 bg-gray-700">
      {children}
    </code>
  );
};

export const CustomCodeBlock: React.FC<Props> = (Props) => {
  const code_text: string[] | undefined = Props.codeblock?.split("\n");
  return (
    <div className="flex">
      <div className="w-0.5 mr-3 rounded bg-gray-400"></div>
      <code>
        {code_text?.map((data, index) => (
          <p key={index}>{data}</p>
        ))}
      </code>
    </div>
  );
};
