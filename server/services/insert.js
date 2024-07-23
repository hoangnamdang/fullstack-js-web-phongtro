import db from "../models";
import chothuephongtro from "../data/chothuephongtro.json";
import nhachothue from "../data/nhachothue.json";
import chothuecanho from "../data/chothuecanho.json";
import chothuematbang from "../data/chothuematbang.json";
import { generateCodeProvince, generateLabelCode } from "../utils/generateCode";
import { v4 } from "uuid";
import {
  getAcreage,
  getProvince,
  getStringToPrice,
} from "../utils/commonUtils";
export const insertData = () =>
  new Promise(async (resolve, reject) => {
    try {
      let listAllData = [
        {
          categoryCode: "CTPT",
          categoryValue: "Cho thuê phòng trọ",
          dataHeader: chothuephongtro?.header,
          dataBody: chothuephongtro.body,
        },
        {
          categoryCode: "NCT",
          categoryValue: "Nhà cho thuê",
          dataHeader: nhachothue?.header,
          dataBody: nhachothue.body,
        },
        {
          categoryCode: "CTCH",
          categoryValue: "Cho thuê căn hộ",
          dataHeader: chothuecanho?.header,
          dataBody: chothuecanho.body,
        },
        {
          categoryCode: "CTMB",
          categoryValue: "Cho thuê mặt bằng",
          dataHeader: chothuematbang?.header,
          dataBody: chothuematbang.body,
        },
      ];

      for (let itemData of listAllData) {
        const categoryCode = itemData.categoryCode;
        await db.Category.create({
          code: categoryCode,
          value: itemData.categoryValue,
          header: itemData?.dataHeader?.title,
          subheader: itemData?.dataHeader?.description,
        });
        for (let item of itemData.dataBody) {
          const labelCode = generateLabelCode(
            item?.overview?.content.find((i) => i.name === "Chuyên mục:")
              ?.content
          );
          const userId = v4();
          const overviewId = v4();
          const imagesId = v4();
          const postId = v4();
          const attributeId = v4();
          const provinceId = generateCodeProvince(
            getProvince(item?.header?.address)
          );
          await db.Post.create({
            id: postId,
            title: item?.header?.title,
            star: item?.header?.star,
            labelCode: labelCode,
            address: item?.header?.address,
            attributesId: attributeId,
            categoryCode: categoryCode,
            description: JSON.stringify(item?.mainContent?.content),
            userId: userId,
            overviewId: overviewId,
            imagesId: imagesId,
            price: getStringToPrice(item?.header?.attributes?.price),
            provinceId: provinceId,
            acreage: getAcreage(item?.header?.attributes?.acreage),
          });
          await db.Province.findOrCreate({
            where: { code: provinceId },
            defaults: {
              code: provinceId,
              value: getProvince(item?.header?.address),
            },
          });

          await db.Overview.create({
            id: overviewId,
            code: item?.overview?.content.find((i) => i.name === "Mã tin:")
              ?.content,
            area: item?.overview?.content.find((i) => i.name === "Khu vực")
              ?.content,
            type: item?.overview?.content.find(
              (i) => i.name === "Loại tin rao:"
            )?.content,
            target: item?.overview?.content.find(
              (i) => i.name === "Đối tượng thuê:"
            )?.content,
            bonus: item?.overview?.content.find((i) => i.name === "Gói tin:")
              ?.content,
            created: item?.overview?.content.find(
              (i) => i.name === "Ngày đăng:"
            )?.content,
            expired: item?.overview?.content.find(
              (i) => i.name === "Ngày hết hạn:"
            )?.content,
          });
          await db.Label.findOrCreate({
            where: { code: labelCode },
            defaults: {
              code: labelCode,
              value: item?.overview?.content.find(
                (i) => i.name === "Chuyên mục:"
              )?.content,
            },
          });
          await db.Attribute.create({
            id: attributeId,
            published: item?.header?.attributes?.published,
            hashtag: item?.header?.attributes?.hashtag,
          });
          await db.Image.create({
            id: imagesId,
            image: JSON.stringify(item?.images),
          });
        }
      }
      resolve("done");
    } catch (error) {
      reject(error);
    }
  });

const dataPrice = [
  { minPrice: 1000000, maxPrice: -1, value: "Dưới 1 triệu" },
  { minPrice: 1000000, maxPrice: 2000000, value: "Từ 1 tới 2 triệu" },
  { minPrice: 2000000, maxPrice: 3000000, value: "Từ 2 tới 3 triệu" },
  { minPrice: 3000000, maxPrice: 5000000, value: "Từ 3 tới 5 triệu" },
  { minPrice: 5000000, maxPrice: 7000000, value: "Từ 5 tới 7 triệu" },
  { minPrice: 7000000, maxPrice: 10000000, value: "Từ 7 tới 10 triệu" },
  { minPrice: 10000000, maxPrice: 15000000, value: "Từ 10 tới 15 triệu" },
  { minPrice: -1, maxPrice: 15000000, value: "Trên 15 triệu" },
];

export const insertPrice = () =>
  new Promise(async (resolve, reject) => {
    try {
      for (let item of dataPrice) {
        await db.Price.create({
          minPrice: item.minPrice,
          maxPrice: item.maxPrice,
          value: item.value,
        });
      }
      resolve("done");
    } catch (error) {
      reject(error);
    }
  });

const dataAcreage = [
  { minAcreage: 20, maxAcreage: -1, value: "Dưới 20m2" },
  { minAcreage: 20, maxAcreage: 30, value: "Từ 20 tới 30m2" },
  { minAcreage: 35, maxAcreage: 50, value: "Từ 35 tới 50m2" },
  { minAcreage: 50, maxAcreage: 70, value: "Từ 50 tới 70m2" },
  { minAcreage: 70, maxAcreage: 90, value: "Từ 70 tới 90m2" },
  { minAcreage: -1, maxAcreage: 90, value: "Trên 90m2" },
];

export const insertAcreage = () =>
  new Promise(async (resolve, reject) => {
    try {
      for (let item of dataAcreage) {
        await db.Acreage.create({
          minAcreage: item.minAcreage,
          maxAcreage: item.maxAcreage,
          value: item.value,
        });
      }
      resolve("done");
    } catch (error) {
      reject(error);
    }
  });
