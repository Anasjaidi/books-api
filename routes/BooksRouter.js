const express = require("express");
const {getAllBooks} = require('./../controllers/BooksControllers');
const auth = require('../auth/Auth.js')
const router = express.Router()


router.route("/")
        .get(auth.protectResource, getAllBooks)
        // .post()
        // .delete()

module.exports = router