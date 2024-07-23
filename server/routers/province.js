import express from "express";
import * as provinceController from "../controllers/province";
const router = express.Router();

router.get("/", provinceController.getProvince);
export default router;
