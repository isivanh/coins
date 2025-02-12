const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");
const authMiddleware = require('../middlewares/auth-middleware');
const { loginValidationRules, signupValidationRules, validateValidationRules, validator } = require('../middlewares/validator');

router.route('/login').post(loginValidationRules(), validator, authController.login);
router.route('/signup').post(signupValidationRules(), validator, authController.signup);
router.route('/validate').get(validateValidationRules(), validator, authMiddleware, authController.validate);

module.exports = router;