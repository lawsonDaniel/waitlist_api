import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  sex: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  code:{type:String, required: true}
});

const User = mongoose.model("Waitlist", userSchema);

export default User;
