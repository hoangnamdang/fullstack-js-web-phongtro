import express from "express";
import * as insertController from "../controlers/insert";
const router = express.Router();

router.get("/", insertController.insertData);
export default router;
