const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");
const authMiddleware = require('../middlewares/authMiddleware');

router.route('/transfer').post(authMiddleware, userController.transferCoins);
router.route('/users').get(authMiddleware, userController.getAllUsers);

module.exports = router;