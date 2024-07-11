import express from "express";
import * as insertController from "../controllers/insert";
const router = express.Router();

router.get("/", insertController.insertData);
router.get("/price", insertController.insertPrice);
router.get("/acreage", insertController.insertAcreage);
export default router;
