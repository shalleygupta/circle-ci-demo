const { ApolloClient, HttpLink, InMemoryCache } = require("@apollo/client")

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://graphql.datocms.com/",
    fetch: require("cross-fetch").fetch,
    headers: {
      Authorization: "Bearer dcb107ada17f0197ecc89ee04b7bc1",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }),
  ssrMode: false,
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "no-cache",
    },
    watchQuery: {
      fetchPolicy: "no-cache",
    },
  },
})

module.exports = client
