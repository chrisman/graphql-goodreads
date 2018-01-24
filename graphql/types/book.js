const getTranslation = require('../../lib/translate');
const {
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

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
  }),
});

