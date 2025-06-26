import mongoose, { Schema, model } from "mongoose";
import { MONGO_URL } from "./config";  

// Connect to MongoDB
mongoose.connect(MONGO_URL)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ DB connection error:", err.message));


// User Schema
const UserSchema = new Schema({
  username: { type: String, unique: true },
  password: { type: String },
});
export const UserModel = model("User", UserSchema);


// Content Schema
const ContentSchema = new Schema({
  title: { type: String },
  link: { type: String },
  tags: [{ type: mongoose.Types.ObjectId, ref: 'Tag' }],
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true }
});
export const ContentModel = model("Content", ContentSchema);
