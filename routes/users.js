const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { registerUser, loginUser, logoutUser } = require('../controllers/userController');
const { getProtectedResource } = require('../controllers/dataController');

// @route   POST api/users/signup
// @desc    Register a user
// @access  Public
router.post('/signup', registerUser);

// @route   POST api/users/signin
// @desc    Login a user
// @access  Public
router.post('/signin', loginUser);

// @route   POST api/users/logout
// @desc    Logout a user
// @access  Public
router.post('/logout', logoutUser);

// @route   GET api/users/protected
// @desc    Access protected route
// @access  Private
router.get('/protected', auth, getProtectedResource);

module.exports = router;
