const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");
const authMiddleware = require('../middlewares/auth-middleware');
const { transferValidationRules, usersValidationRules, validator } = require('../middlewares/validator');

router.route('/transfer').post(transferValidationRules(), validator, authMiddleware, userController.transferCoins);
router.route('/users').get(usersValidationRules(), validator, authMiddleware, userController.getAllUsers);

module.exports = router;