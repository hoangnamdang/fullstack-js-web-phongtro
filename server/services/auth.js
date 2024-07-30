import { v4 } from "uuid";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import db from "../models";
require("dotenv").config();

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));

export const register = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOrCreate({
        raw: true,
        where: { phone: body.phone },
        defaults: {
          phone: body.phone,
          name: body.name,
          password: hashPassword(body.password),
          id: v4(),
        },
      });
      const token =
        response[1] &&
        jwt.sign(
          { phone: response[0].phone, name: response[0].name },
          process.env.SECRECT_KEY,
          { expiresIn: "2d" }
        );

      const user = {
        id: response[0].id,
        name: response[0].name,
        phone: response[0].phone,
      };

      resolve({
        err: token ? 0 : 2,
        msg: token ? "Register successfully" : "Phone is used",
        token: token ? token : null,
        data: user,
      });
    } catch (error) {
      reject(error);
    }
  });

export const login = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { phone: body.phone },
        raw: true,
      });
      const isCorrectPassword =
        response && bcrypt.compare(body.password, response.password);
      const token =
        isCorrectPassword &&
        jwt.sign(
          { id: response.id, phone: response.phone },
          process.env.SECRECT_KEY,
          { expiresIn: "2d" }
        );
      const user = {
        id: response.id,
        name: response.name,
        phone: response.phone,
      };
      resolve({
        err: token ? 0 : 2,
        msg: token
          ? "Login successfull"
          : response
          ? "Password is wrong"
          : "Phone not found",
        token: token ? token : null,
        data: token ? user : null,
      });
    } catch (error) {
      reject(error);
    }
  });
