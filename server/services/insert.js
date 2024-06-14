import db from "../models";
import chothuephongtro from "../data/chothuephongtro.json";
import nhachothue from "../data/nhachothue.json";
import chothuecanho from "../data/chothuecanho.json";
import chothuematbang from "../data/chothuematbang.json";
import { generateCode } from "../utils/generateCode";
import { v4 } from "uuid";
export const insertData = () =>
  new Promise(async (resove, reject) => {
    try {
      const categoryCode = "CTMB";
      const categoryValue = "Cho thuê mặt bằng";
      const categoryHeader = chothuematbang?.header?.title;
      const categorySubheader = chothuematbang?.header?.description;
      await db.Category.create({
        code: categoryCode,
        value: categoryValue,
        header: categoryHeader,
        subheader: categorySubheader,
      });
      for (let item of chothuematbang.body) {
        const labelCode = generateCode(4);
        const attributesId = v4();
        const userId = v4();
        const overviewId = v4();
        const imagesId = v4();
        const postId = v4();
        const attributeId = v4();

        await db.Post.create({
          id: postId,
          title: item?.header?.title,
          star: item?.header?.star,
          labelCode: labelCode,
          address: item?.header?.address,
          attributesId: attributesId,
          categoryCode: categoryCode,
          description: JSON.stringify(item?.mainContent?.content),
          userId: userId,
          overviewId: overviewId,
          imagesId: imagesId,
        });

        await db.Overview.create({
          id: overviewId,
          code: item?.overview?.content.find((i) => i.name === "Mã tin:")
            ?.content,
          area: item?.overview?.content.find((i) => i.name === "Khu vực")
            ?.content,
          type: item?.overview?.content.find((i) => i.name === "Loại tin rao:")
            ?.content,
          target: item?.overview?.content.find(
            (i) => i.name === "Đối tượng thuê:"
          )?.content,
          bonus: item?.overview?.content.find((i) => i.name === "Gói tin:")
            ?.content,
          created: item?.overview?.content.find((i) => i.name === "Ngày đăng:")
            ?.content,
          expired: item?.overview?.content.find(
            (i) => i.name === "Ngày hết hạn:"
          )?.content,
        });
        await db.Label.create({
          code: labelCode,
          value: item?.overview?.content.find((i) => i.name === "Chuyên mục:")
            ?.content,
        });
        await db.Attribute.create({
          id: attributeId,
          price: item?.header?.attributes?.price,
          acreage: item?.header?.attributes?.acreage,
          published: item?.header?.attributes?.published,
          hashtag: item?.header?.attributes?.hashtag,
        });
        await db.Image.create({
          id: imagesId,
          image: JSON.stringify(item?.images),
        });
      }
      resove("done");
    } catch (error) {
      reject(error);
    }
  });
