const errorsWrapper = require("../errors/errorsWrapper")


module.exports.getAllBooks = errorsWrapper(async (req, res, next) => {
  res.status(400).json({
    "status": "success"
  })
});
const deleteAllBooks = errorsWrapper(async (req, res, next) => {});
const addNewBook = errorsWrapper(async (req, res, next) => {});
