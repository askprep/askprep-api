import mongoose from "mongoose";
const subjectSchema = mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String },
  shortName: { type: String }
});

export default mongoose.model("subject", subjectSchema);
