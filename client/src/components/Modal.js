import React, { useEffect, useState } from "react";
import { ImArrowLeft2 } from "../utils/icon";
const Modal = ({
  open,
  title,
  onClose,
  type,
  data,
  dataObjSearch,
  dataStringDefault = "",
  setDataObjSearch = null,
}) => {
  const [range1, setRange1] = useState(0);
  const [range2, setRange2] = useState(100);
  const [idActive, setIdActive] = useState("");

  useEffect(() => {
    const elTrackActive = document.getElementById("track-active");
    if (elTrackActive) {
      if (range1 <= range2) {
        elTrackActive.style.left = `${range1}%`;
        elTrackActive.style.right = `${100 - range2}%`;
      } else {
        elTrackActive.style.left = `${range2}%`;
        elTrackActive.style.right = `${100 - range1}%`;
      }
    }
  }, [range1, range2]);

  const isNumber = (num) => {
    return typeof num === "number";
  };

  const getUnit = () => {
    return {
      price: {
        title: "trieu",
        num: 15,
      },
      acreage: {
        title: "dien tich",
        num: 90,
      },
    };
  };

  const handleClickTrack = (evt, targetPercent) => {
    const elTrack = document.getElementById("track");
    if (elTrack) {
      let position = elTrack.getBoundingClientRect();
      let percent = isNumber(targetPercent)
        ? targetPercent
        : Math.round(((evt.clientX - position.left) / position.width) * 100);
      if (Math.abs(range1 - percent) >= Math.abs(range2 - percent)) {
        setRange2(percent);
      } else {
        setRange1(percent);
      }
    }
  };

  // https://stackoverflow.com/questions/6137986/javascript-roundoff-number-to-nearest-0-5
  const roundHalf = (num) => {
    return Math.round(num * 2) / 2;
  };

  const convertPercent100toTarget = (num, target) => {
    const onePercent = (1 / 100) * target;
    const percent = num * onePercent;
    return target === 15 ? roundHalf(percent) : Math.round(percent);
  };

  const convertTargetToPercent100 = (num, target) => {
    const onePercent = (1 / target) * 100;
    const percent = num * onePercent;
    return target === 15 ? roundHalf(percent) : Math.round(percent);
  };

  const handleChangeSearch = (code, text) => {
    setDataObjSearch((prev) => ({
      ...prev,
      [type]: { code: code, text: text },
    }));
    onClose && onClose();
  };

  const contentListRadio = (typeRender) => {
    return (
      <>
        {dataObjSearch?.[typeRender]?.code === "all" && (
          <div className="border-b border-gray-300 mb-3 p-2">
            <input
              type="radio"
              id="default"
              className="mr-3"
              value={"all"}
              checked={dataObjSearch?.[typeRender]?.code === "all"}
              name={typeRender}
              onChange={(e) => handleChangeSearch("all", dataStringDefault)}
            />
            <label htmlFor="default" className="font-serif text-base">
              {dataStringDefault}
            </label>
          </div>
        )}

        {data.map((item) => {
          return (
            <div key={item.code} className="border-b border-gray-300 mb-3 p-2">
              <input
                type="radio"
                id={item.code}
                className="mr-3"
                name={typeRender}
                value={dataObjSearch?.[typeRender]?.code}
                checked={dataObjSearch?.[typeRender]?.code === item.code}
                onChange={() => handleChangeSearch(item.code, item.value)}
              />
              <label htmlFor={item.code} className="font-serif text-base">
                {item.value}
              </label>
            </div>
          );
        })}
      </>
    );
  };

  const handleClickUnit = (item, typeUnit) => {
    if (!item) return false;
    const { id, value } = item;
    setIdActive(id);
    const arrNum = value
      .split(" ")
      .map((item) => Number.parseInt(item))
      .filter((i) => i);

    const target = getUnit()[typeUnit]?.num;

    if (arrNum.length === 1) {
      if (+arrNum[0] === 1) {
        setRange1(0);
        setRange2(convertTargetToPercent100(+arrNum[0], target));
      } else if (+arrNum[0] === 20) {
        setRange1(0);
        setRange2(convertTargetToPercent100(+arrNum[0], target));
      } else {
        setRange1(100);
        setRange2(convertTargetToPercent100(+arrNum[0], target));
      }
    }

    if (arrNum.length === 2) {
      setRange1(convertTargetToPercent100(+arrNum[0], target));
      setRange2(convertTargetToPercent100(+arrNum[1], target));
    }
  };

  const getText = () => {
    const unit = getUnit()[type]?.title;
    const target = getUnit()[type]?.num;
    if (range1 === range2) {
      return `Trên ${target} ${unit}`;
    }
    return `${
      range1 <= range2
        ? convertPercent100toTarget(range1, target)
        : convertPercent100toTarget(range2, target)
    } - ${
      range1 <= range2
        ? convertPercent100toTarget(range2, target)
        : convertPercent100toTarget(range1, target)
    } ${unit}`;
  };

  const handleSubmit = () => {
    const min = range1 < range2 ? range1 : range2;
    const max = range1 > range2 ? range1 : range2;
    const text = getText();
    const target = getUnit()[type]?.num;
    setDataObjSearch((prev) => ({
      ...prev,
      [type]: {
        min: convertPercent100toTarget(min, target),
        max: convertPercent100toTarget(max, target),
        text: text,
      },
    }));
    onClose && onClose();
  };

  const getTitle = (typeRender) => {
    const unit = getUnit()[typeRender]?.title;
    const target = getUnit()[typeRender]?.num;
    return (
      <>
        {range1 === range2 && `Trên ${target} ${unit}`}
        {range1 !== range2 &&
          `${
            range1 <= range2
              ? convertPercent100toTarget(range1, target)
              : convertPercent100toTarget(range2, target)
          } - ${
            range1 <= range2
              ? convertPercent100toTarget(range2, target)
              : convertPercent100toTarget(range1, target)
          } ${unit}`}
      </>
    );
  };
  const contentFilterRange = (typeRender) => {
    return (
      <>
        <div className="p-5 py-10 ">
          <div className="relative h-[50px]">
            <div className="absolute z-30 top-[-40px] w-full flex justify-center items-center">
              <span className="font-bold text-orange-600 text-xl">
                {getTitle(typeRender)}
              </span>
            </div>
            <div
              onClick={handleClickTrack}
              id="track"
              className="absolute bg-gray-400 h-[5px] w-full"
            ></div>
            <div
              onClick={handleClickTrack}
              id="track-active"
              className="absolute bg-orange-400 h-[5px]"
            ></div>
            <input
              className="top-[-12px]"
              type="range"
              min={0}
              max={100}
              step={1}
              value={range1}
              onChange={(e) => setRange1(+e.target.value)}
            />
            <input
              className="h-0 top-[-12px]"
              type="range"
              min={0}
              max={100}
              step={1}
              value={range2}
              onChange={(e) => setRange2(+e.target.value)}
            />
            <div className="absolute z-30 bottom-0 w-full flex justify-between items-center">
              <span
                className="cursor-pointer"
                onClick={(evt) => handleClickTrack(evt, 0)}
              >
                0
              </span>
              <span
                className="cursor-pointer"
                onClick={(evt) => handleClickTrack(evt, 100)}
              >
                {`${getUnit()[typeRender]?.num} ${
                  getUnit()[typeRender]?.title
                }`}
              </span>
            </div>
          </div>
        </div>
        <div className="p-4">
          <h6>Chon nhanh</h6>
          <div className="flex gap-3 flex-wrap pt-3 px-5 pb-20">
            {data.map((item) => {
              return (
                <button
                  onClick={() => handleClickUnit(item, typeRender)}
                  key={item.id}
                  className={`px-2 py-1 rounded-sm cursor-pointer ${
                    item.id === idActive ? "bg-blue-700" : "bg-gray-200 "
                  }`}
                >
                  {`${item.value}`}
                </button>
              );
            })}
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-orange-600 uppercase py-3 text-center"
        >
          ap dung
        </button>
      </>
    );
  };

  const renderContentModel = (typeRender) => {
    if (typeRender === "category" || typeRender === "province") {
      return contentListRadio(typeRender);
    }
    if (typeRender === "price" || typeRender === "acreage") {
      return contentFilterRange(typeRender);
    }
    return null;
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 bg-gray-500 opacity-90 flex items-center justify-center">
      <div className="w-2/4 bg-white">
        <div className="flex items-center h-[40px] leading-10 border-b border-gray-300">
          <span
            onClick={() => onClose && onClose()}
            className="text-2xl pl-2 cursor-pointer"
          >
            <ImArrowLeft2 />
          </span>
          <span className="grow text-center">{title}</span>
        </div>
        <div>{renderContentModel(type)}</div>
      </div>
    </div>
  );
};

export default Modal;
