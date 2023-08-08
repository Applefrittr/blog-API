const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    text: { type: String, required: true, trim: true, maxLength: 50 },
    dated: Date,
    post: { type: Schema.Types.ObjectId, ref: "posts" },
    author: { type: String, required: true, maxLength: 20, trim: true },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

CommentSchema.virtual("dated_formatted").get(function () {
  return DateTime.fromJSDate(this.dated).toLocaleString(DateTime.DATETIME_FULL);
});

module.exports = mongoose.model("Comments", CommentSchema);
