import { Op } from "sequelize";
import db from "../models";
import { hasValue } from "../utils/commonUtils";

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
            attributes: ["id", "published", "hashtag"],
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
        attributes: [
          "id",
          "title",
          "star",
          "address",
          "description",
          "price",
          "acreage",
        ],
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

export const getPostByLimit = (page, limit, query) =>
  new Promise(async (resolve, reject) => {
    let searchStr = {};
    if ((await hasValue(query?.gia_tu)) && !(await hasValue(query?.gia_den))) {
      searchStr.price = {
        [Op.gte]: query.gia_tu,
      };
    }
    if (!(await hasValue(query?.gia_tu)) && (await hasValue(query?.gia_den))) {
      searchStr.price = {
        [Op.lte]: query.gia_den,
      };
    }
    if ((await hasValue(query?.gia_tu)) && (await hasValue(query?.gia_den))) {
      searchStr.price = {
        [Op.between]: [query.gia_tu, query.gia_den],
      };
    }

    if (
      (await hasValue(query?.dien_tich_tu)) &&
      !(await hasValue(query?.dien_tich_den))
    ) {
      searchStr.acreage = {
        [Op.gte]: query.dien_tich_tu,
      };
    }
    if (
      (await hasValue(query?.dien_tich_den)) &&
      !(await hasValue(query?.dien_tich_tu))
    ) {
      searchStr.acreage = {
        [Op.lte]: query.dien_tich_den,
      };
    }
    if (
      (await hasValue(query?.dien_tich_tu)) &&
      (await hasValue(query?.dien_tich_den))
    ) {
      searchStr.acreage = {
        [Op.between]: [query.dien_tich_tu, query?.dien_tich_den],
      };
    }

    const formatLimit = Number(limit);
    try {
      const pageStart = 1;
      const offset = (page - pageStart) * formatLimit;
      const response = await db.Post.findAndCountAll({
        where: searchStr,
        nest: true,
        raw: true,
        offset: offset,
        limit: formatLimit,
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

export const getNewsPost = (limit) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.findAll({
        raw: true,
        nest: true,
        limit: limit,
        include: [{ model: db.Image, as: "images", attributes: ["image"] }],
        order: [["createdAt", "DESC"]],
        attributes: ["id", "title", "price", "createdAt"],
      });
      resolve({
        err: 0,
        msg: "get news post success",
        data: response,
      });
    } catch (error) {
      reject(error);
    }
  });
