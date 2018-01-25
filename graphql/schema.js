const AuthorType = require('./types/author').AuthorType;
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
        resolve: (root, args, { loaders }) => loaders.author.load(args.id)
      }
    })
  })
});
