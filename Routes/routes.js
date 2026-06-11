const express = require('express');
const router = express.Router();
const jwtMiddle = require('../Middlewares/jwtMiddleware');

const userControllers = require('../Controllers/userControllers');

router.post('/signup',userControllers.SignUp)
router.post('/signin',userControllers.SignIn)








module.exports = router;