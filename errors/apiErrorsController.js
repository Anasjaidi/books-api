
const apiErrors = (err, req, res, next) => {
	const statusCode = err.statusCode || 500;

	const status = err.status || "error";

	if (process.env.NODE_ENV = "developement") {
		developementErrors(err, res)
  } else if (process.env.NODE_ENV == "production") {
    productionErros(err, res)
  }
};


module.exp