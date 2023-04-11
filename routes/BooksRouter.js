const express = require("express");
const {getAllBooks} = require('./../controllers/BooksControllers');
const auth = require('../auth/Auth.js')
const router = express.Router()
const ErrorWrapper = require('../errors/errorsWrapper')

router.route("/")
        .get(ErrorWrapper(auth.protectResource), getAllBooks)
        // .post()
        // .delete()

module.exports = router