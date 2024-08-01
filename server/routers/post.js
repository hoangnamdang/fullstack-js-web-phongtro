import express from "express";
import * as postController from "../controllers/post";
import verifyToken from "../middleware/verifyToken";
const router = express.Router();
router.get("/all", postController.getPosts);
router.get("/limit", postController.getPostsByLimit);
router.get("/news-post", postController.getNewsPost);
router.get("/get-post/:id", postController.getPost);

router.use(verifyToken);
router.post("/create-post", postController.createPost);
router.get("/get-post-update", postController.getPostDemoUpdate);
router.delete("/delete-post/:id", postController.deletePost);
export default router;
