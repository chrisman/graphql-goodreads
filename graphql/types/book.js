require('dotenv').load();
const fetchBook = require('../../lib/fetch').book;
const DataLoader = require('dataloader');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const getTranslation = require('../../lib/translate');

const BookType = new GraphQLObjectType({
  name: 'Book',
  description: 'a book',
  fields: () => ({
    title: {
      type: GraphQLString,
      args: {
        lang: { type: GraphQLString }
      },
      resolve: (xml, args) => {
        const title = xml.GoodreadsResponse.book[0].title[0];
        return args.lang ? getTranslation({ lang: args.lang, str: title }) : title;
      }
    },
    isbn: {
      type: GraphQLString,
      resolve: xml => xml.GoodreadsResponse.book[0].isbn[0],
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: xml => {
        const authors = xml.GoodreadsResponse.book[0].authors[0].author;
        const ids = authors.map(author => author.id[0]);
        return AuthorLoader.loadMany(ids);
      }
    },
  }),
});

const BookLoader = new DataLoader(keys => Promise.all(keys.map(fetchBook)))

module.exports = {
  BookLoader,
  BookType,
}

const AuthorType = require('./author').AuthorType;
const AuthorLoader = require('./author').AuthorLoader;
