import React from "react";

function SearchItem({ text = "", IcBefore = null, IcAfter = null }) {
  return (
    <div className="w-full flex justify-between items-center bg-slate-50 text-slate-500 py-2 px-2 rounded">
      <span>{IcBefore && <IcBefore />}</span>
      {text}
      <span>{IcAfter && <IcAfter />}</span>
    </div>
  );
}

export default SearchItem;
