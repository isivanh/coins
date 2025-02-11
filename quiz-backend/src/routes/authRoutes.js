const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");
const authMiddleware = require('../middlewares/authMiddleware');

router.route('/login').post(authController.login);
router.route('/signup').post(authController.signup);
router.route('/validate').get(authMiddleware, authController.validate);

module.exports = router;