const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");
const authMiddleware = require('../middlewares/authMiddleware');

router.route('/greetings').get(userController.greetings);
router.route('/getName').post(userController.getName);

module.exports = router;