const prismaClient = require('../prisma/client/prismaClient')

class UserDAO {
	constructor() {
    this.users = prismaClient.user
  }

  async findUserById(ID) {
    return await this.users.findUnique({where: {uid: ID}})
  }

  async findUserByEmail(email) {
        return await this.users.findUnique({where: {email: email}})
  }
  async addNewUser(user) {
        return await this.users.create({data: user})
  }
}

const userDAO = new UserDAO();

module.exports = userDAO;
