import express from "express";
import * as postController from "../controllers/post";
const router = express.Router();
router.get("/all", postController.getPosts);
router.post("/limit", postController.getPostsByLimit);
export default router;
