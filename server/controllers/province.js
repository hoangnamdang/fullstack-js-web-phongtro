import * as provinceService from "../services/province";
export const getProvince = async (req, res) => {
  try {
    const response = await provinceService.getProvince();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "fail get province " + error,
    });
  }
};
