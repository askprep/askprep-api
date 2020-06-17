import mongoose from "mongoose";
import subjectSchema from "./subjects";
const streamSchema = mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String },
  shortName: { type: String, required: true }
});

export default mongoose.model("stream", streamSchema);
