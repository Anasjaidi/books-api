const prisma = require('../prisma/client/prismaClient')

class BookDAO {
    constructor() {
        this.books = prisma.book

        console.log("books " + this.books)
    }

    async getAllBooks() {
        return await this.books.findMany({include: {genres: true, author: true}})
    }

    async addNewBook(book) {
        let {
            title,
            language,
            publicationDate,
            numPages,
            authorUid,
            publisherUid,
            coverImagePath,
            downloadPath,
            previewPath,
            author,
            genres,
            genresIds
        } = book


        return await this.books.create({
            data: {
                title,
                language,
                publication_date: publicationDate,
                num_pages: numPages,
                coverImagePath,
                downloadPath,
                previewPath,
                num_downloads: 0,
                author: {
                    connect: authorUid ? {uid: authorUid} : undefined,
                    create: author ? {name: author.name, bio: author.bio} : undefined
                },
                publisher: {
                    connect: {uid: publisherUid}
                },
                genres: {
                    connect: genresIds ? genresIds.map(genre => ({uid: genre})) : undefined,
                    create: genres ? genres.map(genre => ({
                        name: genre.name,
                        description: genre.description
                    })) : undefined
                },

            },
            include: {
                genres: true,
                publisher: true
            }
        })
    }

    async getBookById(ID) {
        return await this.books.findUnique({
            where: {uid: ID}
        })
    }

    async getFiltredBook(filters) {
        return await this.books.findMany({
            where: filters, include: {
                author: true,
                genres: true,
                publisher: true
            }
        })
    }

    async updateBook(updates, bookId) {
        return await this.books.update({
            where: {
                uid: bookId
            },
            data: updates,
            include: {
                author: true,
                publisher: true,
                genres: true
            }
        })
    }

    async deleteBook(bookID) {
        await this.books.delete({where: {uid: bookID}})
    }
}

const bookDAO = new BookDAO()

module.exports = bookDAO