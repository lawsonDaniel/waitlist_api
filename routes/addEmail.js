import { Router } from "express";
import { AddNewMail } from "../controllers/email.js";

const router = Router();

router.post("/", AddNewMail);

export default router;
