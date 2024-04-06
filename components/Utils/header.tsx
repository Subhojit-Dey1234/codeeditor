import React from "react";
type Props = { children: React.ReactNode };

export const CustomHeader: React.FC<Props> = ({children}) => {
  return (
    <h1 className="text-2xl uppercase font-semibold">
      { children }
    </h1>
  );
}

export const CustomHeader2: React.FC<Props> = ({children}) => {
  return (
    <h2 className="text-lg uppercase font-semibold">
      { children }
    </h2>
  );
}


export const CustomHeader3: React.FC<Props> = ({children}) => {
  return (
    <h3 className="text-base">
      { children }
    </h3>
  );
}