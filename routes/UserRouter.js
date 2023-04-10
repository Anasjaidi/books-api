const express = require('express')

const UserRouter = require('../controllers/UsersController')

const router = express.Router()


router.route('/signup').post(UserRouter.addNewUser)
router.route('/signin').post(UserRouter.signNewUser)


module.exports = router

