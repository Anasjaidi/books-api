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


module.exports.addNewBook = errorsWrapper(async (req, res, next) => {
  const book = await bookDAO.addNewBook(req.body);

  res.status(201).json({
    status: "success",
    data: book
  })
})
const deleteAllBooks = errorsWrapper(async (req, res, next) => {});
const addNewBook = errorsWrapper(async (req, res, next) => {});
