# graphql-goodreads

As a learning exercise, add a graphql layer to the [goodreads
api](https://www.goodreads.com/api/index). (It's a yucky xml api, and so is a
good canditate for for a nice, pretty graphql wrapper.) Add to that the google
translate api to test out the seamlessness of aggregate apis.

Inspired by:

* the *Fun Fun Function* series starting with [this
  video][fff], and
* [this video][steve]

[fff]: https://www.youtube.com/watch?v=lAJWHHUz8_8&t=2293s
[steve]: https://www.youtube.com/watch?v=UBGzsb2UkeY

## What I learned

Strengths of graphql:

1. Adding a wrapper to existing, maybe unpleasant APIs
2. Creating a single, cohesive end point for disparate, aggregate APIs.
3. caching results via dataloaders, so you're not making multiple, redundant
   calls to the backend.

Areas to explore further:

1. Architecture/organization: How do people organize their types and
   dataloaders?

## Development

### Get API keys

1. Get a goodreads [API key](https://www.goodreads.com/api/keys) and save it to
`.env`. (Use the format shown in `env.example`.)
1. Create a [google cloud api key](https://console.cloud.google.com/apis/) and
enable the translate api. Save your key to `.env`.

### Start your server

1. `npm install` && `npm start`
3. open <http://localhost:4000/graphql> to explore the API with `graphiql`.
4. `open client.html` so see an example of a client.

try this sample query:

```
query {
 author(id:57798) {
  name
  books {
    title(lang: "eo")
  }
 }
}
```
