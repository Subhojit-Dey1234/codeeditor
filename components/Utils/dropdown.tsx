export function DropDown({ setLanguage, setFlag, flag }) {
  const list = ["Java", "Javascript", "C++", "Python"];
  return (
    <div
      className="absolute top-5 z-10 text-left p-3 border border-slate-700 rounded-md bg-black"
      style={{ display: flag ? "" : "none" }}
    >
      {list.map((l, ind) => (
        <p className="m-2 cursor-pointer" onClick={()=>{
          setLanguage(l)
          setFlag(false)
        }} key={ind}>{l}</p>
      ))}
    </div>
  );
}
