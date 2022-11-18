const express = require('express')
const router = express.Router()
const AuthController = require('../app/controllers/auth.controller')
const authJWT = require('../app/middleware/authJWT')

router.post(
    '/signup',
    authJWT.checkDuplicateUsername,
    AuthController.signup
)
router.post(
    '/signin',
    AuthController.signin
)
router.post(
    '/signout',
    authJWT.verifyToken,
    AuthController.signout
)
router.post(
    '/refreshToken',
    AuthController.requestRefreshToken
)
module.exports = router
