import db from "../models";
export const getFilterPrice = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Price.findAll({ raw: true });
      resolve({
        err: 0,
        msg: "get success filter price",
        data: response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const getFilterAcreage = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Acreage.findAll({ raw: true });
      resolve({
        err: 0,
        msg: "get success filter acreage",
        data: response,
      });
    } catch (error) {
      reject(error);
    }
  });
