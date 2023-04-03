const express = require("express");
const morgan = require("morgan");
const BooksRouter = require("./routes/BooksRouter");
const { errorsController } = require("./errors/apiErrorsController");

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

app.use(errorsController)