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

/**
 * @swagger
 * /software-project.in/user/login:
 *   post:
 *     summary: Login User
 *     description: Endpoint to login user.
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
 *     responses:
 *       '201':
 *         description: Login successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '400':
 *         description: Please provide all the required fields
 *       '401':
 *         description: Email Id is not regsitered or password is incorrect
 *       '500':
 *         description: Internal server error
 */
router.post("/login", LoginUser);

/**
 * @swagger
 * /software-project.in/user/allUsers:
 *   get:
 *     summary: Get All Users
 *     description: Endpoint to get all users
 *     responses:
 *       '200':
 *         description: All users fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       '500':
 *         description: Internal server error
 */

router.get("/allUsers", getAllUsers);
router.get("/user", getUser);
router.post("/isProfileCompleted", isProfileCompleted);
router.post("/update-profile", updateProfile);
module.exports = router;
