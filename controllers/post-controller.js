const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const post = require("../models/post");

exports.home = asyncHandler(async (req, res, next) => {
    res.send("Welcome to the Blog!");
});

exports.allPosts = asyncHandler(async (req, res, next) => {
    res.send("All Posts GET");
});

exports.createPost = asyncHandler(async (req, res, next) => {
    res.send("Create new post");
});

exports.onePost_GET = asyncHandler(async (req, res, next) => {
    res.send(`Get the specific post ${req.params.postid}`);
});

exports.onePost_comments_GET = asyncHandler(async (req, res, next) => {
    res.send(`Get all comments on specific post ${req.params.postid}`);
});

exports.onePost_comments_POST = asyncHandler(async (req, res, next) => {
    res.send(`Create new comment on specific post ${req.params.postid}`);
});
