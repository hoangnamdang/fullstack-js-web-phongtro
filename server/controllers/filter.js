import * as filterService from "../services/filter";
export const getFilterPrice = async (req, res) => {
  try {
    const response = await filterService.getFilterPrice();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "fail to get filter price " + error,
    });
  }
};

export const getFilterAcreage = async (req, res) => {
  try {
    const response = await filterService.getFilterAcreage();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "fail to get filter acreage " + error,
    });
  }
};
