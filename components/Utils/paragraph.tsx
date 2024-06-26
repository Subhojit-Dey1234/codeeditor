import React from "react";
type Props = { children: React.ReactNode };

const CustomParagraph: React.FC<Props> = ({children}) => {
  return (
    <div className="text-sm leading-relaxed">
      { children }
    </div>
  );
}

export default CustomParagraph;