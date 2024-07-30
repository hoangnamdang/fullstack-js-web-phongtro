import React from "react";
import SelectBox from "./SelectBox";
import { useSelector } from "react-redux";
import { IoMdCamera } from "react-icons/io";
import { handelUploadImage } from "../services/app";
import { MdDelete } from "react-icons/md";
const Overview = ({
  dataPayload,
  setDataPayload,
  gender,
  setErrors,
  errors,
}) => {
  const category = useSelector((state) => state.app.category);
  const { data: user } = useSelector((state) => state.auth);
  const handelChange = (evt) => {
    if (!evt) return null;
    const { name, value } = evt.target;
    if (errors && errors?.[name] && value) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    setDataPayload((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeFile = async (evt) => {
    if (!evt) return null;
    const { name, files } = evt.target;

    let formData = new FormData();
    let listImageUploaded = [];
    for (let file of files) {
      formData.append("file", file);
      formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);
      const response = await handelUploadImage(formData);
      if (response.status === 200) {
        listImageUploaded.push(response.data?.secure_url);
      }
    }
    setDataPayload((prev) => ({
      ...prev,
      [name]: JSON.stringify(listImageUploaded),
    }));
  };

  const handelDeleteImage = (idImage) => {
    const dataImage = JSON.parse(dataPayload.images);
    const dataRemained = dataImage.filter((image) => image !== idImage);
    setDataPayload((prev) => ({
      ...prev,
      images: JSON.stringify(dataRemained),
    }));
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Thong tin mo ta</h1>
      <SelectBox
        setError={setErrors}
        error={errors?.["categoryCode"]}
        required
        name="categoryCode"
        title="Loai chuyen muc"
        keyId="code"
        keyName="value"
        value={dataPayload?.categoryCode}
        setValue={setDataPayload}
        listData={category}
      />
      <div className="mb-2">
        <label className="text-base font-semibold" htmlFor="title">
          tieu de <span className="text-red-600">*</span>
        </label>
        <input
          value={dataPayload?.title}
          onChange={handelChange}
          type="text"
          name="title"
          id="title"
          className="w-full p-1 border border-gray-500 outline-none"
        />
        {errors?.["title"] && (
          <span className="text-red-600">{errors?.["title"]}</span>
        )}
      </div>
      <div className="mb-2">
        <label className="text-base font-semibold" htmlFor="desc">
          Noi dung mo ta <span className="text-red-600">*</span>
        </label>
        <textarea
          onChange={handelChange}
          value={dataPayload.description}
          name="description"
          id="desc"
          rows={4}
          cols={100}
          className="w-full p-1 border border-gray-500 outline-none"
        />
        {errors?.["description"] && (
          <span className="text-red-600">{errors?.["description"]}</span>
        )}
      </div>
      <div className="mb-2">
        <label className="text-base font-semibold" htmlFor="info">
          Thong tin lien he
        </label>
        <input
          value={user?.name}
          id="info"
          readOnly
          className="p-1 bg-gray-200 w-full outline-none border border-gray-500"
        />
      </div>
      <div className="mb-2">
        <label className="text-base font-semibold" htmlFor="phone">
          Dien thoai
        </label>
        <input
          value={user?.phone}
          id="phone"
          readOnly
          className="p-1 bg-gray-200 w-full outline-none border border-gray-500"
        />
      </div>
      <div className="mb-2">
        <label className="text-base font-semibold" htmlFor="price">
          Gia cho thue <span className="text-red-600">*</span>
        </label>
        <div className="flex items-center">
          <input
            onChange={handelChange}
            value={dataPayload.price}
            name="price"
            id="price"
            type="number"
            className="w-full p-1 border border-gray-500 outline-none"
          />
          <span className=" bg-gray-300 w-12 flex-none p-1 text-center">
            Dong
          </span>
        </div>
        {errors?.["price"] && (
          <span className="text-red-600">{errors?.["price"]}</span>
        )}
      </div>
      <div className="mb-2">
        <label className="text-base font-semibold" htmlFor="acreage">
          Dien tich <span className="text-red-600">*</span>
        </label>
        <div className="flex items-center ">
          <input
            onChange={handelChange}
            value={dataPayload.acreage}
            name="acreage"
            id="acreage"
            type="number"
            className="w-full p-1 border border-gray-500 outline-none"
          />
          <span className=" bg-gray-300 w-12 flex-none p-1 text-center">
            M2
          </span>
        </div>
        {errors?.["acreage"] && (
          <span className="text-red-600">{errors?.["acreage"]}</span>
        )}
      </div>
      <SelectBox
        name="targetId"
        title="Doi tuong cho thue"
        keyId="id"
        keyName="name"
        value={dataPayload?.targetId}
        setValue={setDataPayload}
        listData={gender}
      />
      <div className="mb-2">
        <span className="text-base font-semibold">Hinh anh</span>
        <label
          htmlFor="image"
          className="w-full h-[150px] flex flex-col items-center justify-center bg-gray-100 border border-dashed border-gray-700"
        >
          <IoMdCamera fontSize={40} color="blue" />
          <span className="text-base font-semibold">chon anh</span>
        </label>
        <input
          onChange={handleChangeFile}
          hidden
          type="file"
          id="image"
          name="images"
          multiple
        />
      </div>
      <div className="mb-2">
        <span className="text-base font-semibold mb-1 block">anh da chon</span>
        <div className="flex items-center gap-3">
          {dataPayload.images &&
            JSON.parse(dataPayload.images)?.map((image) => {
              return (
                <div key={image} className="relative w-[150px] h-[150px]">
                  <img
                    src={image}
                    alt=""
                    className="w-full h-full object-cover block absolute"
                  />
                  <span
                    title="xoa"
                    onClick={() => handelDeleteImage(image)}
                    className="absolute right-2 top-3 cursor-pointer"
                  >
                    <MdDelete size={30} />
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Overview;
