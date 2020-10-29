import mongoose from "mongoose";

const instance = mongoose.Schema({
  id:String,
  title: String,
});

export default mongoose.model("items", instance);
