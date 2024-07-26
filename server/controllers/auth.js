import * as authService from "../services/auth";

export const register = async (req, res) => {
  try {
    const { name, phone, password } = req.body;
    if (!name || !phone || !password) {
      return res.status(400).json({
        err: 1,
        msg: "Missing input !",
      });
    }

    const response = await authService.register(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "server error " + error,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { phone, password } = req.body;
    if (!phone || !password) {
      return res.status(400).json({
        err: 1,
        msg: "Missing input !",
      });
    }
    const response = await authService.login(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "fail login" + error,
    });
  }
};
