const express = require("express");
const router = express.Router();
const postController = require("../controllers/post-controller");
const userController = require("../controllers/user-controller");

// GET home page
router.get("/", postController.home);

// GET all posts
router.get("/posts", postController.allPosts);

// POST(create) a new post
router.post("/posts", postController.createPost);

// GET a specific post
router.get("/posts/:postid", postController.onePost_GET);

// POST an update (edit) a specific post
router.post("/posts/:postid", postController.onePost_POST);

// DELETE a specific post
router.delete("/posts/:postid", postController.onePost_DELETE);

// GET all comments on a specific post
router.get("/posts/:postid/comments", postController.onePost_comments_GET);

// POST(create) a new comment on a specific post
router.post("/posts/:postid/comments", postController.onePost_comments_POST);

// Post(create) new user
router.post("/user/create", userController.create);

// Post user log in
router.post("/user", userController.user_POST);

// GET user information
router.get("/user", userController.user_GET);

module.exports = router;
