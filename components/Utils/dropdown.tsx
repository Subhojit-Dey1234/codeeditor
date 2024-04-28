import { Dispatch, SetStateAction } from "react";
import { languageName } from "../Types/CodeEditor";

interface IProps {
  setLanguage: Dispatch<SetStateAction<languageName>>;
  setFlag: Dispatch<SetStateAction<boolean>>;
  flag: boolean;
}
// { setLanguage: Dispatch<SetStateAction<boolean>>, setFlag, flag }

export function DropDown({flag, setLanguage, setFlag}: IProps) {
  const language_list: languageName[] = ["Javascript"];
  return (
    <div
      className="absolute top-5 z-10 text-left p-3 border border-slate-700 rounded-md bg-black"
      style={{ display: flag ? "" : "none" }}
    >
      {language_list.map((l, ind) => (
        <p
          className="m-2 cursor-pointer"
          onClick={() => {
            setLanguage(l);
            setFlag(false);
          }}
          key={ind}
        >
          {l}
        </p>
      ))}
    </div>
  );
}
