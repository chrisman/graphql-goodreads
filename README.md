# graphql-goodreads

As a learning exercise, add a graphql layer to the [goodreads api](https://www.goodreads.com/api/index)

Inspired by [this episode](https://www.youtube.com/watch?v=lAJWHHUz8_8&t=2293s) of *Fun Fun Function*.

## Development

1. Get a goodreads [API key](https://www.goodreads.com/api/keys) and save it to `.env`. (Use the format shown in `env.example`.)
1. Create a [google cloud api key](https://console.cloud.google.com/apis/) and enable the translate api. Save your key to `.env`.
1. `npm install` && `npm start`
3. open <http://localhost:4000/graphql>

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
