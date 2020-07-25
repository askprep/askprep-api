/**
 * discussion model
 */
const mongoose = require("mongoose");

const discussionSchema = mongoose.Schema({
  forum_id: { type: mongoose.Schema.ObjectId, ref: "forum", required: true },
  discussion_slug: { type: String, required: true },
  user_id: { type: mongoose.Schema.ObjectId, ref: "user", required: true },
  date: { type: Date, required: true },
  snippet: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: Object, required: true },
  contentSnippet: Object,
  subject: [{ type: String, required: true }],
  stream: [String],
  college: [String],
  favorites: [String],
  tags: [String],
  pinned: { type: Boolean, require: true }
});

module.exports = mongoose.model("discussion", discussionSchema);
