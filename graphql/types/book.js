const {
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const getTranslation = require('../../lib/translate');

const BookType = new GraphQLObjectType({
  name: 'Book',
  description: 'a book',
  fields: () => ({
    title: {
      description: `the book's title`,
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
      description: `the book's isbn number`,
      type: GraphQLString,
      resolve: xml => xml.GoodreadsResponse.book[0].isbn[0],
    },
    authors: {
      description: `a list of the book's authors`,
      type: new GraphQLList(AuthorType),
      resolve: (xml, args, { loaders }) => {
        const authors = xml.GoodreadsResponse.book[0].authors[0].author;
        const ids = authors.map(author => author.id[0]);
        return loaders.author.loadMany(ids);
      }
    },
  }),
});


module.exports = {
  BookType,
}

const AuthorType = require('./author').AuthorType;
