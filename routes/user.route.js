const express = require('express')
const router = express.Router()

const UserController = require('../controllers/user.controller')

router.get('/users', UserController.GetAllUsers)
router.post('/user', UserController.AddUser)
router.put('/user/:user_id', UserController.UpdateUser)
router.delete('/user/:user_id', UserController.DeleteUser)

module.exports = router
