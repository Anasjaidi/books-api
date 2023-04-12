const prisma = require('../prisma/client/prismaClient')

class BookDAO {
    constructor() {
        this.books = prisma.book

        console.log("books " + this.books)
    }

    async getAllBooks() {
        return await this.books.findMany()
    }

    async addNewBook(book) {
        let {
            title,
            language,
            publication_date: publicationDate,
            num_pages: numPages,
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
                publicationDate,
                numPages,
                coverImagePath,
                downloadPath,
                previewPath,
                num_downloads: 0,
                author: {
                    connect: authorUid ? {uid: authorUid} : undefined,
                    create: author ? {name: author.name, bio: author.bio} : undefined
                },
                publisher : {
                    connect: {uid: publisherUid}
                },
                genres: {
                    connect: genresIds ? genresIds.map(genre => {uid: genre}): undefined,
                    create: genres ? genres.map(genre => ({name: genre.name,  description: genre.description})) : undefined
                },

            },
            include: {
                genres: true,
                author: true,
                publisher: true
            }
        })
    }
}

const bookDAO = new BookDAO()

module.exports = bookDAO