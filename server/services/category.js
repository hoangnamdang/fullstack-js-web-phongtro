import db from "../models";

export const getCategory = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Category.findAll({
        attributes: ["code", "value"],
        raw: true,
      });
      resolve({
        status: 0,
        data: response,
        msg: "get category success",
      });
    } catch (error) {
      reject(error);
    }
  });
