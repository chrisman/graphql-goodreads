const fetchAuthor = require('../lib/fetchAuthor');
const AuthorType = require('./types/author').AuthorType;
const AuthorLoader = require('./types/author').AuthorLoader;
const {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLSchema,
} = require('graphql');

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: '...',
    fields: () => ({
      author: {
        type: AuthorType,
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (root, args) => AuthorLoader.load(args.id)
      }
    })
  })
});
