require('dotenv').load();
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const getTranslation = require('../../lib/translate');
const fetchAuthor = require('../../lib/fetchAuthor');

module.exports = new GraphQLObjectType({
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
        return result = Promise.all(ids.map(fetchAuthor));
      }
    },
  }),
});

const AuthorType = require('./author');
