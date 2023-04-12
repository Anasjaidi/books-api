const express = require("express");
const booksController = require('./../controllers/BooksControllers');
const auth = require('../auth/Auth.js')
const router = express.Router()
const ErrorWrapper = require('../errors/errorsWrapper')

router.route("/")
        .get(ErrorWrapper(auth.protectResource), booksController.getAllBooks)
        .post(booksController.addNewBook)
        // .delete()

module.exports = router