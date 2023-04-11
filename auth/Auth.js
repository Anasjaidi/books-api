const userDAO = require('../repository/userDAO')
const bcrypt = require('bcryptjs')
const AppError = require('../errors/errorsClass')

const jwt = require('jsonwebtoken')
class Auth {

  constructor() {

  }
  async signup(user) {
    const {email, firstName, lastName} = user

    const password = await this.hash(user.password, 12)

    const newUser = await userDAO.addNewUser({
      firstName,
      lastName,
      email,
      password
    })
  const token = this.generateToken(newUser.uid, process.env.JWT_EXPIRE_IN, process.env.JWT_SECRET_KEY)
  return {
      token,
      newUser
  }
}

  async signin(user) {
    const {email, password} = user

    const u = await  userDAO.findUserByEmail(email)

    console.log(u)
    console.log(password, email)

    if (!u || !(await this.passwordIsValid(password, u.password))) {
      throw new AppError(400, "email or password are not valid")
    }

    return await this.generateToken(u.uid, process.env.JWT_EXPIRE_IN, process.env.JWT_SECRET_KEY)
  }
  async passwordIsValid(candidatePassword, password) {
    return await bcrypt.compare(candidatePassword, password)
  }
  async hash(payload, salt) {
    return await bcrypt.hash(payload, salt)
  }

  generateToken(payload, EXPIRE_DATE, SECRET_KEY) {
    return  jwt.sign({id: payload}, SECRET_KEY, {expiresIn: EXPIRE_DATE})
  }
}

const auth = new Auth();

module.exports = auth