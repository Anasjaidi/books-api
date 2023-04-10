const auth = require('../auth/Auth')
const ErrorsWrapper = require('../errors/errorsWrapper')
const addNewUser = ErrorsWrapper(async (req, res,  next) => {
    const user = await auth.signup(req.body)
    res.status(201).json({
        status: "success",
        data: user
    })
})

const signNewUser = ErrorsWrapper(async (req, res,  next) => {
    const user = await auth.signin(req.body)
    res.status(201).json({
        status: "success",
        data: user
    })
})

module.exports = {addNewUser, signNewUser}