import * as categoryService from "../services/category";
export const getCategory = async (req, res) => {
  try {
    const response = await categoryService.getCategory();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      status: -1,
      msg: "fail get category " + error,
    });
  }
};
