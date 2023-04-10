const userDAO = require('../repository/userDAO')
const bcrypt = require('bcryptjs')
class Auth {

  constructor() {
  }
  async signup(user) {
    const {email, firstName, lastName} = user

    const password = await this.hash(user.password, 12)

    return await userDAO.addNewUser({
      firstName,
      lastName,
      email,
      password
    })
  }

  async hash(payload, salt) {
    return await bcrypt.hash(payload, salt)
  }
}

const auth = new Auth();

module.exports = auth