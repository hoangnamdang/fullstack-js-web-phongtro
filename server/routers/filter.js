import express from "express";
import * as filterController from "../controllers/filter";
const router = express.Router();
router.get("/price", filterController.getFilterPrice);
router.get("/acreage", filterController.getFilterAcreage);
export default router;
