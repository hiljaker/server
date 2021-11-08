const express = require('express');
const { signup, verifyAccount } = require('../controllers/auth_controllers');
const { verifyAuthToken, verifyVerificationToken } = require('../helpers/token_verify');
const router = express.Router()

router.post("/signup", signup)
router.get("/verify", verifyVerificationToken, verifyAccount)

module.exports = router