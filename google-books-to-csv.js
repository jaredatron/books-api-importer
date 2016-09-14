require('dotenv').config();
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY
const fs = require('fs')
const URL = require('url')
const request = require('request-promise')
const ParameterizedQuery = require('pg-promise').ParameterizedQuery;
const faker = require('faker')

const sql = fs.createWriteStream('books.sql')
var table = require('knex')({
  client: 'pg',
});

const getBooks = function(query){
  let url = URL.parse('https://www.googleapis.com/books/v1/volumes')
  url.query = {
    q: query,
    key: GOOGLE_API_KEY,
  }
  url = url.format(url)

  return request({url: url}).then(response => {
    response = JSON.parse(response)
    response.items.forEach(book => {
      const authors = book.volumeInfo.authors || [];
      const booksRow = {
        // google_books_id: book.id,
        title: book.volumeInfo.title,
        subtitle: book.volumeInfo.subtitle,
        image_url: (book.volumeInfo.imageLinks||{}).thumbnail,
        description: book.volumeInfo.description,
        page_count: book.volumeInfo.pageCount,
        // published_at: book.volumeInfo.publishedDate,
      }

      const insertBook = table('books').insert(booksRow)+";\n";
      process.stdout.write('B')
      sql.write(insertBook)
      authors.forEach(author => {
        const authorsRow = {
          name: author
        }
        const insertAuthor = table('authors').insert(authorsRow)+";\n";
        process.stdout.write('A')
        sql.write(insertAuthor)

        const insertBookAuthorsRow = `INSERT INTO book_authors(book_id, author_id) SELECT currval('books_id_seq'), currval('authors_id_seq');\n`
        process.stdout.write('A')
        sql.write(insertBookAuthorsRow)
      })
    })
  })
}

const googleBooksApiRequests = []

for(let n=200; n; n--){
  googleBooksApiRequests.push(faker.random.word())
}

Promise.all(googleBooksApiRequests.map(getBooks)).then(() => {
  sql.end()
  console.log('done')
}).catch(error => {
  console.log(error)
  process.exit(1);
})
