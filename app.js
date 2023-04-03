const express = require("express");
const morgan = require("morgan");
const BooksRouter = require("./routes/BooksRouter");
const { errorsController } = require("./errors/apiErrorsController");
const { AppError } = require("./errors/errorsClass");

const app = express()

/**
 * start middlewares
*/
app.use(express.json())
app.use(morgan("dev"))


/**
 * start routes
*/

app.use("/api/v1/books", BooksRouter)

/**
 * start default route
*/

app.use("*", (req, res, next) => {
  next(new AppError(404, `can't find requested url: ${req.originalUrl}`))
})

/**
 * start default route
*/

app.use(errorsController)

module.exports = app