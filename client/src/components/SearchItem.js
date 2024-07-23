import React from "react";

function SearchItem({
  text = "",
  IcBefore = null,
  IcAfter = null,
  onClick = null,
  value = "",
}) {
  return (
    <div
      onClick={onClick}
      className="w-full flex justify-between items-center bg-slate-50 text-slate-500 py-2 px-2 rounded cursor-pointer"
    >
      <span>{IcBefore && <IcBefore />}</span>
      <span className={`${value && "text-black font-bold"}`}>
        {value || text}
      </span>
      <span>{IcAfter && <IcAfter />}</span>
    </div>
  );
}

export default SearchItem;
