
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const generateToken =
  require("../utils/generateToken");


// REGISTER USER

const registerUser = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
      password,
      bloodGroup,
    } = req.body;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message:
          "Email already registered",
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const user =
      await User.create({
        name,
        email,
        password:
          hashedPassword,
        bloodGroup,
      });

    res.status(201).json({
      message:
        "Registration Successful",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "Server Error",
    });
  }
};


// LOGIN USER

const loginUser = async (
  req,
  res
) => {
  try {
    const {
      email,
      password,
    } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message:
          "Invalid Credentials",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message:
          "Invalid Credentials",
      });
    }

    const token =
      generateToken(
        user._id
      );

    res.status(200).json({
      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        bloodGroup:
          user.bloodGroup,
      },
    });
  } catch (error) {
    res.status(500).json({
      message:
        "Server Error",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};