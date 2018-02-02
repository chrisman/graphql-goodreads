const DataLoader = require('dataloader');
const cors = require('cors');
const express = require('express');
const fetchAuthor = require('./lib/fetch').author;
const fetchBook = require('./lib/fetch').book;
const graphqlHTTP = require('express-graphql');
const schema = require('./graphql/schema');

const app = express();
const PORT = 4000;

app.use(cors());

app.use('/graphql', graphqlHTTP(req => {
  const loaders = {
    author: new DataLoader(keys => Promise.all(keys.map(fetchAuthor))),
    book: new DataLoader(keys => Promise.all(keys.map(fetchBook))),
  };

  return {
    context: { loaders },
    graphiql: true,
    schema,
  };
}));

let server = app.listen(PORT, function() {
  console.log(`GraphQL listening on port ${PORT}`);
});

