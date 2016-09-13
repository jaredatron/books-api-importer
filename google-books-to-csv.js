require('dotenv').config();
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY
const fs = require('fs')
const URL = require('url')
const request = require('request-promise')
const csvWriter = require('csv-write-stream')
const faker = require('faker')

const writer = csvWriter()
writer.pipe(fs.createWriteStream('books.csv'))

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
      const row = {
        google_books_id: book.id,
        title: book.volumeInfo.title,
        subtitle: book.volumeInfo.subtitle,
        authors: book.volumeInfo.authors.join(', '),
        published_at: book.volumeInfo.publishedDate,
        description: book.volumeInfo.description,
        pageCount: book.volumeInfo.pageCount,
        thumbnail: book.volumeInfo.imageLinks.thumbnail,
      }
      process.stdout.write('.')
      writer.write(row)
    })
  })
}

const queries = []

for(let n=200; n; n--){
  queries.push(faker.random.word())
}

Promise.all(queries.map(getBooks)).then(() => {
  writer.end()
  console.log('done')
})
