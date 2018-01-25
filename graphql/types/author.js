require('dotenv').load();

const fetchAuthor = require('../../lib/fetch').author;
const DataLoader = require('dataloader');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const key = process.env.APIKEY;

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: 'an author',
  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: parsedXML =>
        parsedXML.GoodreadsResponse.author[0].name[0]
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: parsedXML => {
        const ids = parsedXML.GoodreadsResponse.author[0].books[0].book.map(book => book.id[0]._);
        return BookLoader.loadMany(ids);
      },
    },
  }),
});

const AuthorLoader = new DataLoader(keys => Promise.all(keys.map(fetchAuthor)));

module.exports = {
  AuthorType,
  AuthorLoader,
}

const BookType = require('./book').BookType;
const BookLoader = require('./book').BookLoader;
