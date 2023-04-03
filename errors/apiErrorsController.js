
const productionErros = (err, res) => {
	res.status(err.statusCode).json({
		status: "fail",
	})
}

const developementErrors = (err, res) => {
	res.status(err.statusCode).jsob({
		status: err.status,
		message: err.message,
		stack: err.stack,
		err: err
	})
}

export const errorsController = (err, req, res, next) => {
	const statusCode = err.statusCode || 500;

	const status = err.status || "error";

	if (process.env.NODE_ENV = "developement") {
		developementErrors(err, res)
  } else if (process.env.NODE_ENV == "production") {
    productionErros(err, res)
  }
};
