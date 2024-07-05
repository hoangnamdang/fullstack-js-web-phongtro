import express from "express";
import * as postController from "../controlers/post";
const router = express.Router();
router.get("/all", postController.getPosts);
export default router;
