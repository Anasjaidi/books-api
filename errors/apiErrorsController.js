
const productionErros = (err, res) => {
	res.status(err.status).json({
		status: err.status,
		message: err.message,
		stack: err.stack,
		err
	})
}

const developementErrors = (err, res) => {
	// opeartional, trusted: send error to the client
	if (err.isOperational) {
		res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
		});

		// programming or other errors: Don't leak error details
	} else {
		// 1) Log Error
		console.error(err);

		// 2) send geniric error
		res.status(500).json({
			status: "error",
			message: "Something got wrong!",
		});
	}
}

exports.errorsController = (err, req, res, next) => {
	const statusCode = err.statusCode || 500;

	const status = err.status || "error";

	if (process.env.NODE_ENV = "dev") {
		developementErrors(err, res)
  } else if (process.env.NODE_ENV == "production") {
    productionErros(err, res)
  }
};
