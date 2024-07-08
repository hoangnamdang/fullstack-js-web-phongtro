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

export const getPostByLimit = (page, limit) =>
  new Promise(async (resolve, reject) => {
    try {
      const pageStart = 1;
      const offset = (page - pageStart) * limit;
      const response = await db.Post.findAndCountAll({
        nest: true,
        raw: true,
        offset: offset,
        limit: limit,
        include: [
          {
            model: db.Attribute,
            as: "attributes",
            attributes: { exclude: ["id", "updatedAt", "createdAt"] },
          },
          {
            model: db.Image,
            as: "images",
            attributes: { exclude: ["id", "updatedAt", "createdAt"] },
          },
          {
            model: db.User,
            as: "user",
            attributes: { exclude: ["password", "updatedAt", "createdAt"] },
          },
        ],
        attributes: {
          exclude: [
            "attributesId",
            "userId",
            "overviewId",
            "imagesId",
            "updatedAt",
            "createdAt",
          ],
        },
      });
      resolve({
        err: 0,
        msg: "success get post",
        data: response,
      });
    } catch (error) {
      reject(error);
    }
  });
