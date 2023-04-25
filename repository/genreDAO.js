const prisma = require("../prisma/client/prismaClient")

class GenreDAO {
    constructor() {
        this.genres = prisma.genre
    }

    async getAllGenres() {
        return await this.genres.findMany()
    }

    async addNewGenre(genre) {
        return await this.genres.create({data: genre})
    }

    async updateGenre(updates, genreID) {
        return await this.genres.update({where: {uid: genreID}, data: updates})
    }

    async deleteGenre(genreID) {
        await this.genres.delete({where: genreID})
    }
}
const genreDAO = new GenreDAO()
module.exports = genreDAO