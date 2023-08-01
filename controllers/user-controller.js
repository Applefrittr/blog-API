const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Create a new user with a hashed password using bcrypt
exports.create = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const user = new User({
    username: req.body.username,
  });

  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    if (err) {
      console.log(err);
      return;
    } else {
      user.password = hashedPassword;
      await user.save();
      res.json({ message: "success!" });
    }
  });
});

// Log the user in.  Find User in database, compare passwords and then create a jwt to be sent back tot he front end
exports.login = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username }) // Query the user and call lean() to convert to regular JS object to prep for JWT serialization
    .lean()
    .exec();
  console.log(user);
  if (!user) {
    res.json({ message: "User does not exist!" });
    return;
  }
  if (await bcrypt.compare(req.body.password, user.password)) {
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET); // Create web token to be passed back to front end
    res.json({ message: "User logged in", accessToken });
  } else {
    res.json({ message: "Incorrect Password!" });
  }
});
