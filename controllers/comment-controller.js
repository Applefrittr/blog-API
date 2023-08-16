const asyncHandler = require("express-async-handler");
const Post = require("../models/post");
const Comment = require("../models/comment");
const handleToken = require("./handle-token");
const jwt = require("jsonwebtoken");

exports.onePost_comments_GET = asyncHandler(async (req, res, next) => {
  const comments = await Comment.find({ post: req.params.postid })
    .sort({ dated: -1 })
    .populate("post")
    .exec();

  res.json({ message: "Comments returned", comments });
});

exports.onePost_comments_POST = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.postid).exec();

  const comment = new Comment({
    text: req.body.text,
    author: req.body.author,
    post: post,
    dated: new Date(),
  });

  post.comments.push(comment);

  await post.save();
  await comment.save();

  res.json({ message: "Comment added" });
});

exports.onePost_comments_DELETE = [
  handleToken,
  asyncHandler(async (req, res, next) => {
    jwt.verify(
      req.token,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, payload) => {
        if (err) {
          res.json({ message: "Forbidden" });
        } else {
          console.log(req.params.commentid);
          const post = await Comment.findByIdAndRemove(
            req.params.commentid
          ).exec();

          res.json({ message: "Comment Deleted" });
        }
      }
    );
  }),
];
