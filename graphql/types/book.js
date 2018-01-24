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
      resolve: books => books.title[0],
    },
    isbn: {
      type: GraphQLString,
      resolve: books => books.isbn[0],
    },
  }),
});

