const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const appError = require("../utils/appError");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// TODO: implement a controller to verify the current user's token and make sure
// it is not expired

const signToken = (userID) => {
  return jwt.sign({ id: userID }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

const sendToken = (res, user, statusCode, message) => {
  const token = signToken(user);
  const cookiesOptions = {
    // expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
    // secure: process.env.ENV === 'production' && true
  };

  res.cookie("jwt", token, cookiesOptions);

  res.status(statusCode).json({
    status: "success",
    message,
    token,
    user,
  });
};

exports.signup = async (req, res, next) => {
  const data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  };

  const user = await User.create(data);

  sendToken(res, user, 201, "User created successfully");
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(
      new appError("You must provide both an email and a password", 400)
    );
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new appError("We can't find this account, please sign up"));
  }
  if (!(await user.comparePasswords(req.body.password, user.password))) {
    return next(new appError("Invalid email or password", 401));
  }

  sendToken(res, user, 200, "User logged in successfully");
};

module.exports.logout = async (req, res) => {
  const { email } = req.body;
  const user = User.findOne({ email });
  res.cookie("jwt", "");
  res.status(200).json({
    status: "success",
    message: "User has been logged out successfully",
  });
};

module.exports.forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new appError(
        "You are trying to recover a password for an account that does not exist. Please consider signing up",
        404
      )
    );
  }

  const passwordResetToken = user.generatePasswordResetToken();

  const resetPasswordURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/resetPassword/${passwordResetToken}`;

  const message = `Please follow this link to reset your password: ${resetPasswordURL}`;

  const data = {
    email: req.body.email,
    subject: "Password reset",
    message,
  };

  try {
    await sendEmail(data);
    res.status(200).json({
      status: "success",
      message: "PRT sent to user",
      token: passwordResetToken,
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiry = undefined;
    return next(new appError("Failed to send PRT to user", 500));
  }
};

module.exports.resetPassword = async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetTokenExpiry: { $gt: Date.now() },
  });
  console.log("user: ", user);

  if (!user) {
    return next(new appError("Invalid or expired token", 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordChangedAt = Date.now();
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpiry = undefined;
  await user.save();

  sendToken(res, user, 200, "Your password was successfully reset");
};
