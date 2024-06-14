import React from "react";

function Input({
  label,
  type = "text",
  value = "",
  onChange = null,
  error = "",
  ...props
}) {
  return (
    <div className="flex flex-col">
      <label>{label}</label>
      <input
        className="bg-blue-200 p-2 outline-none rounded-md"
        type={type}
        value={value}
        onChange={onChange}
        {...props}
      />
      {error && <span className="text-red-600 italic">{error}</span>}
    </div>
  );
}

export default Input;
