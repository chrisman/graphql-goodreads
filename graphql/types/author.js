const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} = require('graphql');
const BookType = require('./book');

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
      resolve: parsedXML =>
        parsedXML.GoodreadsResponse.author[0].books[0].book
    },
  }),
});

