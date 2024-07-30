import React from "react";

const SelectBox = ({
  title,
  keyId,
  keyName,
  value,
  listData,
  setValue,
  name,
  required,
  error,
  setError,
}) => {
  const handleChange = (evt) => {
    if (!evt) return null;
    const { name, value } = evt.target;
    if (error && value) {
      setError((prev) => ({ ...prev, [name]: "" }));
    }
    setValue((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="flex flex-col flex-1 mb-4">
      <label htmlFor="box" className="text-base font-semibold">
        {title} {required && <span className="text-red-600">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={handleChange}
        id="box"
        className="p-2 border border-gray-500 outline-none"
      >
        <option value="" className="p-2">
          {`Chon ${title}`}
        </option>
        {listData.length > 0 &&
          listData.map((item) => {
            return (
              <option key={item?.[keyId]} value={item?.[keyId]} className="p-2">
                {item?.[keyName]}
              </option>
            );
          })}
      </select>
      {error && <span className="text-red-600">{error}</span>}
    </div>
  );
};

export default SelectBox;
