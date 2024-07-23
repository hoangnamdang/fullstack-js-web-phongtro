export const getStringToPrice = (str) => {
  if (!str) return 0;
  const [price, txtPrice] = str.split(" ");
  if (txtPrice === "triệu/tháng") {
    const million = 1000000;
    return Number(price) * million;
  }
  const formatPrice = price.replace(".", "");
  return Number(formatPrice);
};

export const getAcreage = (str) => {
  if (!str) return 0;
  const acreage = str.slice(0, -2);
  return Number(acreage);
};

export const hasValue = async (param) => {
  if (param && param !== undefined && param !== "") {
    return true;
  }
  return false;
};

export const getProvince = (str) => {
  if (!str) return null;
  let arrAddress = str.split(",");
  return arrAddress[arrAddress.length - 1].trim();
};
