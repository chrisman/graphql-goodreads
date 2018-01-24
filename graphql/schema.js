const fetch = require('node-fetch');
const util = require('util');
const parseXML = util.promisify(require('xml2js').parseString);
const AuthorType = require('./types/author');
const {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLSchema,
} = require('graphql');

require('dotenv').load();
const key = process.env.APIKEY;

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
        resolve: (root, args) => fetch(`https://www.goodreads.com/author/show.xml?id=${args.id}&format=xml&key=${key}`)
          .then(response => response.text())
          .then(parseXML)
      }
    })
  })
});
