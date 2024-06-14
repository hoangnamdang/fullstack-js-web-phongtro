import express from "express";
import * as categoryControler from "../controlers/category";
const router = express.Router();

router.get("/all", categoryControler.getCategory);
export default router;
