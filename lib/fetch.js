require('dotenv').load();
const fetch = require('node-fetch');
const util = require('util');
const parseXML = util.promisify(require('xml2js').parseString);
const key = process.env.APIKEY;

const author = id => fetch(`https://www.goodreads.com/author/show.xml?id=${id}&format=xml&key=${key}`)
.then(response => response.text())
.then(parseXML)


const book = id => fetch(`https://www.goodreads.com/book/show/${id}.xml?key=${key}`)
.then(response => response.text())
.then(parseXML)

module.exports = {
  author,
  book,
}
