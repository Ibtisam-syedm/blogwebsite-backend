const express = require("express");
const router = express.Router();
const authenticaion = require("../controllers/authentication");

router.get("/login",authenticaion.get_login);
router.get("/signup",authenticaion.get_signup);
router.post("/login",authenticaion.post_login);
router.post("/signup",authenticaion.post_signup);

module.exports = router;