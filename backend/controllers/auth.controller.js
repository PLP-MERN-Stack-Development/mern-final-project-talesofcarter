import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

// Helper function to generate JWT
export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
export const registerUser = async (req, res) => {
  const { fullName, company, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const user = await User.create({
      fullName,
      company,
      email,
      password,
    });

    if (user) {
      const userData = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        company: user.company,
        token: generateToken(user._id),
      };

      res.status(201).json({
        success: true,
        message: "User created successfully.",
        data: userData,
      });
    } else {
      res.status(400).json({ success: false, message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const userData = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        company: user.company,
        token: generateToken(user._id),
      };
      res.json({ success: true, message: "Login successful", data: userData });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/me
export const getMe = async (req, res) => {
  // req.user is populated by the authMiddleware
  res.json(req.user);
};
