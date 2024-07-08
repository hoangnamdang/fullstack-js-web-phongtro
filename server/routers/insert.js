import express from "express";
import * as insertController from "../controllers/insert";
const router = express.Router();

router.get("/", insertController.insertData);
export default router;
