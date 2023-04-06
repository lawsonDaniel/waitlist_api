import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  //get the number of users that have joined the waitlist
  res.send("working");
});

export default router;
