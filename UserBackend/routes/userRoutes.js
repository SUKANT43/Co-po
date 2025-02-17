const express = require("express");
const { registerUser, loginUser, changePassword } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/api/userRegister", registerUser); // Register a new user
router.post("/api/login", loginUser); // User login and JWT token generation
router.post("/api/userChange-password", authMiddleware, changePassword); // Protected route for changing password

module.exports = router;
