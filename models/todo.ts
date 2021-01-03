import mongoose from "mongoose";
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  name: String,
  isCompleted: Boolean,
  authorid: String,
});

module.exports = mongoose.model("Todo", todoSchema);
