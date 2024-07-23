import db from "../models";

export const getProvince = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Province.findAll({
        attributes: ["code", "value"],
        raw: true,
      });
      resolve({
        err: 0,
        data: response,
        msg: "get province success",
      });
    } catch (error) {
      reject(error);
    }
  });
