import db from "../models";

export const getPosts = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.findAll({
        raw: true,
        nest: true,
        include: [
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["id", "price", "acreage", "published", "hashtag"],
          },
          {
            model: db.Image,
            as: "images",
            attributes: ["image"],
          },
          {
            model: db.User,
            as: "user",
            attributes: ["name", "phone", "avatar"],
          },
        ],
        attributes: ["id", "title", "star", "address", "description"],
      });
      resolve({
        err: 0,
        msg: "get posts success",
        data: response,
      });
    } catch (error) {
      reject(error);
    }
  });
