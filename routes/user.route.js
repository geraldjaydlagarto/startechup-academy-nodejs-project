const express = require('express')
const router = express.Router()
const { isAuthenticated } = require('../utils/middleware')
const UserController = require('../controllers/user.controller')

router.get('/users', isAuthenticated, UserController.GetAllUsers)
router.get('/users/:userType', UserController.GetUsersByType)
router.get('/user/:userId', UserController.GetUserById)
router.get('/user/:userId/organizations', UserController.GetOrganizationsByUser)

router.post('/user/register', UserController.Register)
router.post('/user/login', UserController.Login)
router.post('/user/logout', UserController.Logout)

router.put('/user/:userId', UserController.UpdateUser)

router.delete('/user/:userId', UserController.DeleteUser)

module.exports = router
