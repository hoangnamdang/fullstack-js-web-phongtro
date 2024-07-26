import express from "express";
import verifyToken from "../middleware/verifyToken";

const router = express.Router();

router.use(verifyToken);

export default router;
