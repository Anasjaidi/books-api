const errorsWrapper = require("../errors/errorsWrapper")
const bookDAO = require('../repository/bookDAO')

module.exports.getAllBooks = errorsWrapper(async (req, res, next) => {

  const books = await bookDAO.getAllBooks()

  res.status(400).json({
    "status": "success",
    result: books.length,
    data: books
  })
});
const deleteAllBooks = errorsWrapper(async (req, res, next) => {});
const addNewBook = errorsWrapper(async (req, res, next) => {});
