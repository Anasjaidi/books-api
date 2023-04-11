const prisma = require('../prisma/client/prismaClient')

class BookDAO {
    constructor() {
        this.books = prisma.book

        console.log("books " + this.books )
    }

    async getAllBooks() {
        return await this.books.findMany()
    }

    async addNewBook(book) {
        const {title, language, publication_date, num_pages, }
        return await this.books.create({data: })
    }
}

const bookDAO = new BookDAO()

module.exports = bookDAO