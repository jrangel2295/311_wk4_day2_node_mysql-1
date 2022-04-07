const express = require('express')
const usersController = require('../controllers/users')
const router = express.Router()
const pool = require('../sql/connection')


router.get('/', usersController.getAllUsers)

router.get('/getusers/:id', usersController.getusers)

router.get('/:id', usersController.getUserById)

router.post('/', usersController.createUser)

router.put('/:id', usersController.updateUserById)

router.delete('/:first_name', usersController.deleteUserByFirstName)

module.exports = router