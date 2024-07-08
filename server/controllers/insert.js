import * as insertService from "../services/insert";
export const insertData = async (req, res) => {
  try {
    const response = await insertService.insertData();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      status: -1,
      msg: "fail insert " + error,
    });
  }
};
