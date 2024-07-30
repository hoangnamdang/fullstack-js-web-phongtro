import React, { useState } from "react";
import Address from "../../components/Address";
import Overview from "../../components/Overview";
import { apiCreatePost } from "../../services/post";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const initPayload = {
  title: "",
  address: "",
  categoryCode: "",
  description: "",
  images: "",
  price: 0,
  acreage: 0,
  provinceId: "",
  provinceName: "",
  districtName: "",
  districtId: "",
  targetId: "",
};

const CreatePost = () => {
  const category = useSelector((state) => state.app.category);
  const { data: user } = useSelector((state) => state.auth);
  const [dataPayload, setDataPayload] = useState(initPayload);
  const [errors, setErrors] = useState({
    title: "",
    address: "",
    categoryCode: "",
    description: "",
    price: 0,
    acreage: 0,
    provinceId: "",
    districtId: "",
  });

  const handleValidation = (fields) => {
    let errorInput = {};
    for (let KeyField of Object.keys(fields)) {
      if (!fields[KeyField] && Object.keys(errors).includes(KeyField)) {
        errorInput[KeyField] = "Truong nay khong duoc de trong";
      }
    }
    setErrors((prev) => ({ ...prev, ...errorInput }));
    return Object.keys(errorInput).length !== 0;
  };

  const gender = [
    { id: 1, name: "Nam" },
    { id: 2, name: "Nu" },
  ];

  const handleSubmit = async () => {
    if (handleValidation(dataPayload)) return false;
    const { targetId, districtId, provinceId, ...allData } = dataPayload;
    const nameCategory =
      category?.find((item) => item.code === dataPayload.categoryCode)?.value ||
      "";
    const labelCodeName = `${nameCategory} ${
      dataPayload?.districtName ? dataPayload?.districtName : ""
    }`;
    const userId = user?.id || "";
    const targetName =
      gender.find((item) => item.id === dataPayload.targetId)?.name || "Tat ca";
    const dataPost = {
      ...allData,
      targetName: targetName,
      labelCodeName: labelCodeName,
      userId: userId,
    };
    const response = await apiCreatePost(dataPost);
    if (response.data.err === 0) {
      setDataPayload(initPayload);
      Swal.fire({
        title: "success!",
        text: `${response.data.msg}`,
        icon: "success",
      });
    }
  };

  return (
    <div className="p-3">
      <h1 className="text-xl font-semibold border-b border-gray-400 pb-3">
        Dang tin moi
      </h1>
      <div className="flex">
        <div className="flex-auto">
          <Address
            setErrors={setErrors}
            errors={errors}
            dataPayload={dataPayload}
            setDataPayload={setDataPayload}
          />
          <Overview
            setErrors={setErrors}
            errors={errors}
            dataPayload={dataPayload}
            gender={gender}
            setDataPayload={setDataPayload}
          />
          <button
            onClick={handleSubmit}
            className="p-2 w-full bg-blue-500 text-xl text-white rounded-sm"
          >
            Tao bai viet
          </button>
        </div>
        <div className="w-1/3">Map</div>
      </div>
    </div>
  );
};

export default CreatePost;
