const express = require('express')
const router = express.Router()

const UserController = require('../controllers/user.controller')

router.get('/users', UserController.GetAllUsers)
router.get('/users/:userType', UserController.GetUsersByType)
router.get('/user/:userId', UserController.GetUserById)
router.get('/user/:userId/organizations', UserController.GetOrganizationsByUser)

router.post('/user', UserController.AddUser)

router.put('/user/:userId', UserController.UpdateUser)

router.delete('/user/:userId', UserController.DeleteUser)

module.exports = router
