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


//USER ROUTES
router.post('/register',registerController);

router.post('/login',loginController);

router.get('/profile/:id',verifyTokenAndAuthorization,checkForExpiredToken,getUserProfileController);

router.put('/profile/:id',verifyTokenAndAuthorization,checkForExpiredToken,profileUpdateController);

router.post('/logout/:id',verifyTokenAndAuthorization,checkForExpiredToken,logoutController);

module.exports = router;