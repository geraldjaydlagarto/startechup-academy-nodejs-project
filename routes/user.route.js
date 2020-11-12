const express = require('express')
const router = express.Router()
const { isAuthenticated } = require('../utils/middleware')
const UserController = require('../controllers/user.controller')
const passport = require('passport')
require('../models/passport-config')

router.get('/users', isAuthenticated, UserController.GetAllUsers)
router.get('/users/:userType', isAuthenticated, UserController.GetUsersByType)
router.get('/user/:userId', isAuthenticated, UserController.GetUserById)
router.get('/user/:userId/organizations', isAuthenticated, UserController.GetOrganizationsByUser)

router.post('/user/register', UserController.Register)
router.post('/user/login', passport.authenticate('local', { session: false }), UserController.Login)
router.post('/user/logout', isAuthenticated, UserController.Logout)

router.put('/user/:userId', isAuthenticated, UserController.UpdateUser)

router.delete('/user/:userId', isAuthenticated, UserController.DeleteUser)

app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        return res.status(200).json({ message: 'ok', accessToken: req. })
    })
module.exports = router
