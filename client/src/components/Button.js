import React from "react";

function Button({
  text = "",
  color = "",
  bgColor = "",
  IcBefore = null,
  IcAfter = null,
  customStyle = "",
  handleClick = null,
  ...props
}) {
  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 ${color} ${bgColor} ${customStyle}`}
      {...props}
    >
      {IcBefore && IcBefore}
      {text}
      {IcAfter && IcAfter}
    </button>
  );
}

export default Button;
