const router = require('express').Router();
const {verifyTokenAndAuthorization}  = require('../controllers/verifyToken');
const {checkForExpiredToken} =require('../controllers/verifyTokenBlockList');
const {
    registerController,
    loginController,
    logoutController
} = require('../controllers/userAuthController');
const {
    getUserProfileController,
    profileUpdateController
} = require('../controllers/userController');

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the provided <br>
 *              username => Should Contain only (A-Z,a-z) <br>
 *              email => Should be a valid email address <br>
 *              password => Contains atleast 8 characters and must contain atleast one from all of them(A-Z,a-z,0-9,special character)
 *     tags:
 *       - User
 *     requestBody:
 *       description: User registration details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               username: john_doe
 *               email: john@example.com
 *               password: password123
 *     responses:
 *       200:
 *         description: User registered successfully
 *       201:
 *         description: Email already registered
 *       401:
 *         description: Invalid username
 *       402:
 *         description: Invalid email address
 *       403:
 *         description: Invalid password format
 *       500:
 *         description: Internal server error
 */

router.post('/register',registerController);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: User login
 *     description: Authenticate user by email and password
 *     tags:
 *       - User
 *     requestBody:
 *       description: User login credentials
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
 *             example:
 *               email: john@example.com
 *               password: password123
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Unauthorized - Invalid email
 *       401:
 *         description: Unauthorized - Invalid password
 *       500:
 *         description: Internal server error
 */

router.post('/login',loginController);

/**
 * @swagger
 * /api/profile/{id}:
 *   get:
 *     summary: Get user profile
 *     description: Fetch the profile details of a user by their ID
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         description: User ID
 *         required: true
 *         schema:
 *           type: string
 *       - in: header
 *         name: Token
 *         description: Token for authorization
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       400:
 *         description: Unauthorized - Token not found / user does have any token
 *       401:
 *         description: Unauthorized - Invalid token
 *       402:
 *         description: Unauthorized - Invalid user
 *       500:
 *         description: Internal server error
 */

router.get('/profile/:id',verifyTokenAndAuthorization,checkForExpiredToken,getUserProfileController);

/**
 * @swagger
 * /api/profile/{id}:
 *   put:
 *     summary: Update user profile
 *     description: Update the profile details of a user by their ID
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         description: User ID
 *         required: true
 *         schema:
 *           type: string
 *       - in: header
 *         name: Authorization
 *         description: Token for authorization
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: User profile details to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               newPassword:
 *                 type: string
 *               oldPassword:
 *                 type: string
 *             example:
 *               username: john_doe
 *               email: john@example.com
 *               newPassword: Password@123
 *               oldPassword: Password@123
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *       400:
 *         description: Unauthorized - Invalid or missing token
 *       401:
 *         description: Unauthorized - Invalid token
 *       402:
 *         description: Unauthorized - Invalid user
 *       500:
 *         description: Internal server error
 */

router.put('/profile/:id',verifyTokenAndAuthorization,checkForExpiredToken,profileUpdateController);

/**
 * @swagger
 * /api/logout/{id}:
 *   post:
 *     summary: Logout user
 *     description: Logout a user by their ID
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         description: User ID
 *         required: true
 *         schema:
 *           type: string
 *       - in: header
 *         name: token
 *         description: Token for authorization
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       400:
 *         description: Unauthorized - Token not found / user does have any token
 *       401:
 *         description: Unauthorized - Invalid token
 *       402:
 *         description: Unauthorized - Invalid user
 *       500:
 *         description: Internal server error
 */

router.post('/logout/:id',verifyTokenAndAuthorization,checkForExpiredToken,logoutController);

module.exports = router;


