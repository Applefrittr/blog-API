const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: { type: String, requried: true, trim: true, maxLength: 100 },
    text: { type: String, required: true, trim: true },
    dated: Date,
    comments: [{ type: Schema.Types.ObjectId, ref: "Comments" }],
    // author: { type: Schema.Types.ObjectId, ref: "User" },
    published: Boolean,
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

PostSchema.virtual("dated_formatted").get(function () {
  return DateTime.fromJSDate(this.dated).toLocaleString(DateTime.DATE_FULL);
});

module.exports = mongoose.model("posts", PostSchema);
