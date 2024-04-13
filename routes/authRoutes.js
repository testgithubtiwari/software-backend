const express = require("express");
const {
  createUser,
  LoginUser,
  getAllUsers,
  getUser,
  isProfileCompleted,
  updateProfile,
  sendotp,
} = require("../controllers/authController");
const router = express.Router();

/**
 * @swagger
 * /software-project.in/user/register:
 *   post:
 *     summary: Add a new user
 *     description: Endpoint to add a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               userType:
 *                 type: string
 *               rollNumber:
 *                 type: string
 *               branch:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 newuser:
 *                   type: object
 *       '404':
 *         description: Invalid request body or missing fields
 *       '409':
 *         description: User with this email already exists
 *       '500':
 *         description: Internal server error
 */
router.post("/register", createUser);

router.post("/login", LoginUser);
router.get("/allUsers", getAllUsers);
router.get("/user", getUser);
router.post("/isProfileCompleted", isProfileCompleted);
router.post("/update-profile", updateProfile);
module.exports = router;
