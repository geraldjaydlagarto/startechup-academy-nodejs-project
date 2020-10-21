const express = require('express')
const router = express.Router()
const { isAuthenticated } = require('../utils/middleware')
const UserController = require('../controllers/user.controller')

router.get('/users', isAuthenticated, UserController.GetAllUsers)
router.get('/users/:userType', isAuthenticated, UserController.GetUsersByType)
router.get('/user/:userId', isAuthenticated, UserController.GetUserById)
router.get('/user/:userId/organizations', isAuthenticated, UserController.GetOrganizationsByUser)

router.post('/user/register', UserController.Register)
router.post('/user/login', UserController.Login)
router.post('/user/logout', isAuthenticated, UserController.Logout)

router.put('/user/:userId', isAuthenticated, UserController.UpdateUser)

router.delete('/user/:userId', isAuthenticated, UserController.DeleteUser)

module.exports = router
