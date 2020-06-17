import mongoose from "mongoose";

const universitySchema = mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  shortName: { type: String, required: true },
  state: { type: String },
  city: { type: String },
  isIIT: { type: Boolean, default: false },
  affiliatedby: { type: String }
});

export default mongoose.model("university", universitySchema);
