import { Router } from "express";
import { getAllUsersCount } from "../controllers/user.js";

const router = Router();

router.get("/", getAllUsersCount);

export default router;
