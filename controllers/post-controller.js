const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Post = require("../models/post");
const handleToken = require("./handle-token");
const jwt = require("jsonwebtoken");

exports.home = asyncHandler(async (req, res, next) => {
  res.send("Welcome to the Blog!");
});

// GET controller for returning all posts.  Controller accessible to public (no jwt protection)
exports.allPosts = asyncHandler(async (req, res, next) => {
  const allPosts = await Post.find()
    .populate("comments")
    .sort({ dated: -1 })
    .exec();

  res.json({ message: "Returned all Posts", allPosts });
});

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

// GET controller for returning 1 specific post back.  Controller accessible to the public
exports.onePost_GET = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.postid)
    .populate("comments")
    .exec();

  if (req.headers["origin"] === "http://localhost:3002") console.log("YES!");

  res.json({ message: "Returned post", post });
});

// Post controller for handling updates to a specific post passed from teh front end.  Protected by jwt
exports.onePost_POST = [
  handleToken,
  asyncHandler(async (req, res, next) => {
    jwt.verify(
      req.token,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, payload) => {
        if (err) {
          res.json({ message: "Forbidden" });
        } else {
          const post = await Post.findById(req.params.postid).exec();
          post.title = req.body.title;
          post.text = req.body.text;
          req.body.published
            ? (post.published = true)
            : (post.published = false);
          await post.save();

          res.json({ message: "Post Updated" });
        }
      }
    );
  }),
];

// DELETE controller to delete a specific post.  Protected by jwt
exports.onePost_DELETE = [
  handleToken,
  asyncHandler(async (req, res, next) => {
    jwt.verify(
      req.token,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, payload) => {
        if (err) {
          res.json({ message: "Forbidden" });
        } else {
          const post = await Post.findByIdAndRemove(req.params.postid).exec();

          res.json({ message: "Post Deleted" });
        }
      }
    );
  }),
];
