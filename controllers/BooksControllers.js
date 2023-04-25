const AppError = require("../errors/errorsClass");
const errorsWrapper = require("../errors/errorsWrapper");
const prismaFiltersGenerator = require("../helpers/filtersGenerator");
const bookDAO = require("../repository/bookDAO");
const userDAO = require("../repository/userDAO");

module.exports.getAllBooks = errorsWrapper(async (req, res, next) => {

	const filters = prismaFiltersGenerator.generateFilters(req.query)

	console.log(JSON.stringify(filters, null, 1));

	const books = await bookDAO.getFiltredBook(filters);

	res.status(200).json({
		status: "success",
		result: books.length,
		data: books,
	});
});

module.exports.addNewBook = errorsWrapper(async (req, res, next) => {
	const book = await bookDAO.addNewBook(req.body);

	res.status(201).json({
		status: "success",
		data: book,
	});
});

module.exports.getBook = errorsWrapper(async (req, res, next) => {
	const book = await bookDAO.getBookById(req.params.bookId);

	if (!book) return next(new AppError(404, "Book not found."));

  res.status(200).json({
    status: "success",
    data: book
  })
});
