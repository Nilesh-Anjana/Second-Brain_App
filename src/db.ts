import { strict } from "assert";
import mongoose, { model, mongo, Schema } from "mongoose";
import { title } from "process";
import { string } from "zod";


// connection to mongoose section
// direct MongoDB Atlas connection string (URL encoded @ = %40)
mongoose.connect("mongodb+srv://nilesh:nilesh%408055@cluster0.ud7rwoi.mongodb.net/Brainly?retryWrites=true&w=majority")
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ DB connection error:", err.message));





// the schema and model section
// schema and model for the user
const UserSchema = new Schema({
  username: { type: String, unique: true },
  password: { type: String },
});
export const UserModel = model("User", UserSchema);





//schema and model for the content
const ContentSchema = new Schema({
  title: { type: String},
  link: { type: String },
  tags :[{type : mongoose.Types.ObjectId, ref: 'Tag'}], // need to understand tags's inputs(PENDING.....)
  userId :{type :mongoose.Types.ObjectId , ref: 'User', required : true}
});
export const ContentModel = model("Content", ContentSchema);

