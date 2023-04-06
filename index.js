import express from "express";
import emailRouter from "./routes/addEmail.js";
import userRouter from "./routes/user.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { config } from "dotenv";

const app = express();
// Parse application/json
app.use(bodyParser.json());

//env config
config();

//manage routes
app.use("/email", emailRouter);
app.use("/user", userRouter);

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    process.env.DATABASE_URL || "mongodb://localhost:27017/waitlist"
  );
}

const Port = process.env.PORT || 5000;
app.listen(Port, (err) => {
  if (err) console.error(err);
  console.log(`app started on port http://localhost:${Port}`);
});
