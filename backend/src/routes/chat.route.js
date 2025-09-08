import express from "express";
import { generateToken } from "../config/stream.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/token", protectRoute, generateToken);

export default router;