const auth = require('../auth/Auth')
const addNewUser = async (req, res,  next) => {
    const user = await auth.signup(req.body)
    res.status(201).json({
        status: "success",
        data: user
    })
}

module.exports = {addNewUser}