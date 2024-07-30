import { Op, where } from "sequelize";
import db from "../models";
import {
  generateSixNumHashtag,
  getProvince,
  hasValue,
} from "../utils/commonUtils";
import { v4 } from "uuid";
import { generateCodeProvince, generateLabelCode } from "../utils/generateCode";
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

export const getPostByLimit = (query) =>
  new Promise(async (resolve, reject) => {
    const page = Number(query?.page) || 1;
    const limit = Number(query?.limit) || 10;
    const categoryCode = query?.categoryCode || "CTPT";
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

    if (await hasValue(categoryCode)) {
      searchStr.categoryCode = {
        [Op.eq]: categoryCode,
      };
    }

    if (await hasValue(query?.province)) {
      searchStr.provinceId = {
        [Op.eq]: query?.province,
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

export const createPost = (formData) =>
  new Promise(async (resolve, reject) => {
    try {
      const title = formData.title;
      const star = 5;
      const labelCode = generateLabelCode(formData.labelCodeName);
      const address = formData.address;
      const attributesId = v4();
      const categoryCode = formData.categoryCode;
      const description = formData.description;
      const userId = formData.userId;
      const overviewId = v4();
      const imagesId = v4();
      const price = formData.price;
      const acreage = formData.acreage;
      const provinceId = generateCodeProvince(getProvince(formData.address));
      const postId = v4();
      const provinceName = formData.provinceName;
      const hashtag = generateSixNumHashtag();
      const labelCodeName = formData.labelCodeName;
      const targetName = formData.targetName;
      const image = formData.images;
      const currentDate = new Date().toISOString().split("T")[0];
      let dateExpired = new Date();
      dateExpired.setDate(dateExpired.getDate() + 10);

      await db.Post.create({
        id: postId,
        title: title,
        star: star,
        labelCode: labelCode,
        address: address,
        attributesId: attributesId,
        categoryCode: categoryCode,
        description: description,
        userId: userId,
        overviewId: overviewId,
        imagesId: imagesId,
        price: price,
        acreage: acreage,
        provinceId: provinceId,
      });

      await db.Province.findOrCreate({
        where: { code: provinceId },
        defaults: {
          code: provinceId,
          value: provinceName,
        },
      });

      await db.Overview.create({
        id: overviewId,
        code: `#$${hashtag}`,
        area: labelCodeName,
        type: "Phòng trọ, nhà trọ",
        target: targetName,
        bonus: "Tin thuong",
        created: new Date(),
        expired: dateExpired,
      });

      await db.Label.findOrCreate({
        where: { code: labelCode },
        defaults: {
          code: labelCode,
          value: labelCodeName,
        },
      });

      await db.Image.create({
        id: imagesId,
        image: image,
      });

      await db.Attribute.create({
        id: attributesId,
        published: currentDate,
        hashtag: hashtag,
      });
      resolve({
        err: 0,
        msg: "create post success",
      });
    } catch (error) {
      reject(error);
    }
  });

export const getPostDemoUpdate = (userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.findAll({
        where: { userId: userId },
        raw: true,
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

export const deletePost = (idPost) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.destroy({
        where: { id: idPost },
      });
      resolve({
        err: 0,
        msg: "delete post success",
      });
    } catch (error) {
      reject(error);
    }
  });
