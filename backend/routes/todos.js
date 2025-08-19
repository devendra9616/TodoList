// const express =require('express');
// const router=express.Router();

// // import controller
// const {createTodo}=require("../controllers/createTodo");
// const {getTodo,getTodoById}=require("../controllers/getTodo");
// const {updateTodo}=require("../controllers/updateTodo");
// const {deleteTodo}=require("../controllers/deleteTodo");
// const {register,login,forgetPassword,resetPassword}=require("../authController/auth");

// // define API routes
// router.post("/createTodo",createTodo);
// router.get("/getTodos",getTodo);
// router.get("/getTodos/:id",getTodoById);
// router.put("/updateTodo/:id",updateTodo);
// router.delete("/deleteTodo/:id",deleteTodo);

// // AuthRoutes
// router.post("/register", register);
// router.post("/login", login);
// router.post("/forget-password", forgetPassword);
// router.post("/reset-password", resetPassword);

// module.exports=router; 





const express = require("express");
const router = express.Router();

// Controllers
const { createTodo } = require("../controllers/createTodo");
const { getTodo, getTodoById } = require("../controllers/getTodo");
const { updateTodo } = require("../controllers/updateTodo");
const { deleteTodo } = require("../controllers/deleteTodo");
const { register, login, forgetPassword, resetPassword } = require("../authController/auth");

// Middleware
const jwtVerify = require("../middlewares/jwtverify");

// Import User Model
const User = require("../models/Todo");

// Auth Routes
router.post("/register", register);
router.post("/login", login);
router.post("/forget-password", forgetPassword);
router.post("/reset-password", resetPassword);

// Todos
router.post("/createTodo", createTodo);
router.get("/getTodos", getTodo);
router.get("/getTodos/:id", getTodoById);
router.put("/updateTodo/:id", updateTodo);
router.delete("/deleteTodo/:id", deleteTodo);

// New Route: Get full user data from token
router.get("/get-user-details", jwtVerify, async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId).select("-password"); // Exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User authenticated",
      user,
    });
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
