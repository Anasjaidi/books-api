const prismaClient = require('../prisma/client/prismaClient')

class UserDAO {
	constructor() {
    this.users = prismaClient.user
  }
  async addNewUser(user) {
        return await this.users.create({data: user});
  }
  async findUserById(ID) {
    return await this.users.findUnique({where: {uid : ID}})
  }
}

const userDAO = new UserDAO();

module.exports = userDAO;
