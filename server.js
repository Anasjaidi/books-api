const app = require('./app');
const dotenv = require('dotenv');


dotenv.config()

const port = process.env.port || 3004

const server = app.listen(port, () => console.log("server starts on port " + port))
