require('dotenv').load();

const fetch = require('node-fetch');
const util = require('util');
const parseXML = util.promisify(require('xml2js').parseString);
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const BookType = require('./book');
const key = process.env.APIKEY;

module.exports = new GraphQLObjectType({
  name: 'Author',
  description: 'an author',
  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: parsedXML =>
        parsedXML.GoodreadsResponse.author[0].name[0]
    },
    books: {
      type: GraphQLList(BookType),
      resolve: parsedXML => {
        const ids = parsedXML.GoodreadsResponse.author[0].books[0].book.map(book => book.id[0]._);
        return Promise.all(ids.map(id => 
          fetch(`https://www.goodreads.com/book/show/${id}.xml?key=${key}`)
          .then(response => response.text())
          .then(parseXML)
        ));
      },
    },
  }),
});

