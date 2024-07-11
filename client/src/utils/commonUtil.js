export const appendUrl = (paramsUrl = [], data = {}) => {
  let params = [];
  for (let item of paramsUrl) {
    params.push(item);
  }

  if (params.length === 0) {
    return data;
  }

  let searchObjParams = {};
  for (let [key, value] of params) {
    const keyCompare = key.split("_")[0];
    const isExits = Object.keys(data).some((d) => d.includes(keyCompare));
    if (isExits) {
      searchObjParams = { ...searchObjParams, ...data };
    } else {
      searchObjParams = {
        ...searchObjParams,
        ...data,
        [key]: value,
      };
    }
  }

  return searchObjParams;
};
