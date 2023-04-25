const prisma = require("../prisma/client/prismaClient")

class AuthorDAO {
    constructor() {
        this.authors = prisma.author
    }

    async getAllAuthors() {
        return await this.authors.findMany()
    }

    async addNewAuthor(author) {
        return await this.authors.create({data: author})
    }

    async updateAuthor(updates, authorID) {
        return await this.authors.update({where: {uid: authorID}, data: updates})
    }

    async deleteAuthor(authorID) {
        await this.authors.delete({where: authorID})
    }
}
const authorDAO = new AuthorDAO()
module.exports = authorDAO