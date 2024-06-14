import React from "react";

function Button({
  text = "",
  color = "",
  bgColor = "",
  IcBefore = null,
  IcAfter = null,
  customStyle = "",
  handleClick = null,
}) {
  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 hover:underline ${color} ${bgColor} ${customStyle}`}
    >
      {IcBefore && <IcBefore />}
      {text}
      {IcAfter && <IcAfter />}
    </button>
  );
}

export default Button;
