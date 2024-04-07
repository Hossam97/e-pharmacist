const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "You have to provide a first name!"],
  },
  lastName: String,
  email: {
    type: String,
    require: [true, "You have to provide an email address"],
    validate: [validator.isEmail, "Please enter a valid email address"],
    // unique: [true, "This email already exists, please log in!"],
  },
  password: {
    type: String,
    required: [true, "You have to provide a password for your account"],
    minLength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "You have to confirm your password!"],
    select: false,
  },
  role: {
    type: String,
    enum: ["pharmacist", "user"],
    default: "user",
  },
  passwordResetToken: String,
  passwordResetTokenExpiry: Date,
  passwordChangedAt: Date
});

// Hash the user password before saving the document
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.comparePasswords = async function (
  inputPassowrd,
  userPassword
) {
  return bcrypt.compare(inputPassowrd, userPassword);
};

userSchema.methods.generatePasswordResetToken = function () {
  const passwordResetToken = crypto.randomBytes(32).toString("hex");

  // Hashing the token before saving it to the DB
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(passwordResetToken)
    .digest("hex");

  // Setting the expiry period of the token to 10 minutes after the token issuance
  this.passwordResetTokenExpiry = Date.now() + 10 * 60 * 1000;

//   console.log('Doc after generating token: ', this.passwordResetTokenExpiry)
  return passwordResetToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
