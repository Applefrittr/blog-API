const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, requried: true, trim: true, maxLength: 50 },
  text: { type: String, required: true, trim: true },
  dated: Date,
  comments: [{ type: Schema.Types.ObjectId, ref: "Comments" }],
  // author: { type: Schema.Types.ObjectId, ref: "User" },
  published: Boolean,
});

PostSchema.virtual("dated_formatted").get(function () {
  return DateTime.fromJSDate(this.dated).toLocaleString(DateTime.DATETIME_FULL);
});

module.exports = mongoose.model("posts", PostSchema);
