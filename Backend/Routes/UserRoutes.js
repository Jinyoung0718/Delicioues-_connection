const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/UserController");

router.post("/signup", UserController.signup);
router.post("/login", UserController.login);

module.exports = router; // 해당 router를 모듈로 내보낸다.
