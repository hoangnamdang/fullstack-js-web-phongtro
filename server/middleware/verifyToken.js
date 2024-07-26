import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.headers.Authorization.split(" ")[1];
  if (!token)
    return res.status(401).json({
      err: 1,
      msg: "Missing access token",
    });
  jwt.verify(token, process.env.SECRECT_KEY, (err, user) => {
    if (err)
      return res.status(401).json({
        err: 1,
        msg: "Access token expired",
      });
    req.user = user;
  });
  next();
};

export default verifyToken;
