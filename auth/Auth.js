const userDAO = require('../repository/userDAO')
const bcrypt = require('bcryptjs')
const AppError = require('../errors/errorsClass')
const {promisify} = require('util')
const jwt = require('jsonwebtoken')
class Auth {

  constructor() {

  }
  async signup(user) {
    const {email, firstName, lastName} = user


    if (!email || !firstName || !lastName || !user.password)
      throw new AppError(400, "required fields are e, f, l, p")

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


    if (!u || !(await this.passwordIsValid(password, u.password))) {
      throw new AppError(400, "email or password are not valid")
    }

    return await this.generateToken(u.uid, process.env.JWT_EXPIRE_IN, process.env.JWT_SECRET_KEY)
  }

  async validateToken(token, SECRET_KEY) {
    return jwt.verify(token, SECRET_KEY);
  }
  async protectResource(req, res, next) {
    let token = req.headers.authorization;

    if (!token) {
      return next(new AppError(400, "please provide a token."))
    } else if (!token.startsWith("Bearer")) {
      return next(new AppError(400, "please provide a valid token."));
    }

    token = token.split(' ')[1]

    if (!token) {
      return next(new AppError(400, "please provide a valid token."));
    }
    const decoded = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET_KEY
    );

    const user = await userDAO.findUserById(decoded.id);

    if (!user) {
      return next(new AppError(401, "user deleted after sign token."));
    } else if (user.passwordChangeAt) {
      if (parseInt(user.passwordChangeAt.getTime() / 1000, 10) > decoded.iat)
        return next(
					new AppError(
						401,
						"password changes after the token was issued please, re sign in."
					)
				);
    }

    req.user = user
    next()
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