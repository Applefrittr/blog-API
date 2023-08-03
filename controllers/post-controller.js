const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Post = require("../models/post");
const Comment = require("../models/comment");
const handleToken = require("./handle-token");
const jwt = require("jsonwebtoken");

exports.home = asyncHandler(async (req, res, next) => {
  res.send("Welcome to the Blog!");
});

// GET controller for returning all posts in the database.  Protected by jwt.
exports.allPosts = [
  handleToken,
  asyncHandler(async (req, res, next) => {
    jwt.verify(
      req.token,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, payload) => {
        if (err) {
          res.json({ message: "Forbidden" });
        } else {
          const allPosts = await Post.find().populate("comments").exec();
          console.log(allPosts);

          res.json({ message: "Returned all Posts", allPosts });
        }
      }
    );
  }),
];

// Create a new Post controller.  Protected by jwt, calls handleToken helper to add token to request obj
// then verifies issuance in order to POST new blog post to database
exports.createPost = [
  handleToken,
  asyncHandler(async (req, res, next) => {
    jwt.verify(
      req.token,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, payload) => {
        if (err) {
          res.json({ message: "Forbidden" });
        } else {
          console.log(req.body.title, req.body.text);
          const post = new Post({
            title: req.body.title,
            text: req.body.text,
            dated: new Date(),
            published: false,
          });

          await post.save();

          res.json({ message: "New Post Created" });
        }
      }
    );
  }),
];

exports.onePost_GET = asyncHandler(async (req, res, next) => {
  res.send(`Get the specific post ${req.params.postid}`);
});

exports.onePost_comments_GET = asyncHandler(async (req, res, next) => {
  res.send(`Get all comments on specific post ${req.params.postid}`);
});

exports.onePost_comments_POST = asyncHandler(async (req, res, next) => {
  res.send(`Create new comment on specific post ${req.params.postid}`);
});
