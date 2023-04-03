const express = require("express");
const {getAllBooks} = require('./../controllers/BooksControllers');

const router = express.Router()


router.route("/")
        .get(getAllBooks)
        // .post()
        // .delete()

module.exports = router