const auth = require('../auth/Auth')
const ErrorsWrapper = require('../errors/errorsWrapper')


const addNewUser = ErrorsWrapper(async (req, res,  next) => {
    const {newUser, token} = await auth.signup(req.body)
    res.status(201).json({
        status: "success",
        data: newUser,
        token
    })
})

const signNewUser = ErrorsWrapper(async (req, res,  next) => {
    const token = await auth.signin(req.body)
    res.status(201).json({
        status: "success",
        token
    })
})

module.exports = {addNewUser, signNewUser}