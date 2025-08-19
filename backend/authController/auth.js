const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("./JwtToken");

exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, description } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
 
    user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      description,
    });

    await user.save();
    res.status(201).json({ msg: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = generateToken(user._id);
    res.json({ msg: "Login successful", token });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

exports.forgetPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ msg: "User not found" });

  res.json({ msg: "Reset link sent ", email });
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // Check if both email & newPassword are provided
    if (!email || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Email and new password are required",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update and save
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (err) {
    console.error("Reset Password Error:", err);
  }
};

