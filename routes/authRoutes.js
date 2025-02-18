const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const checkAuthenticate = require("../middlewares/checkAuthenticate");

router.post("/api/register", authController.register);
router.post("/api/login", authController.login);

router.get("/api/dashboard", checkAuthenticate, authController.getDashboard);

router.post("/api/logout", checkAuthenticate, authController.logout);

module.exports = router;
