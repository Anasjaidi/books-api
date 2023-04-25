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
  async getAllUsers() {
        return await this.users.findMany();
  }

  async updateUser(updates, userID) {
        return await this.users.update({where: {uid: userID}, data: updates})
  }

  async deleteUser(userID) {
        await this.users.delete({where: {uid: userID}})
  }
}

const userDAO = new UserDAO();

module.exports = userDAO;
