const express = require('express');
const router = express.Router();

const userController = require('../controller/user');
const loginController = require('../controller/login');
const userDataController = require('../controller/item');

// Middleware for authentication
const userAuthentication = require('../middleware/auth');
router.post('/register', userController.createUser);
router.post('/login', loginController.loginUser);
router.post('/user_add_item', userAuthentication.authenticate, userDataController.addUserData);
router.get('/user_get_item', userAuthentication.authenticate, userDataController.getUserData);
router.get('/all_user_data', userDataController.allUserData)



module.exports = router;