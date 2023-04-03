const app = require('./app');
const dotenv = require('dotenv');


dotenv.config()

const port = process.env.port || 3004

const server = app.listen(process.env.NODE_ENV, () => console.log("server starts on port " + port))
