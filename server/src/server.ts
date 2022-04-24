import { ApolloServer, gql } from 'apollo-server'

const typeDefs = gql`
  type Article {
    slug: String
    title: String
    author: String
    content: String
  }

  type Query {
    articles: [Article]
  }
`

const articles = [
  {
    slug: 'hello-world',
    title: 'Hello world',
    content: 'Welcome to my new blog. I hope you like it!',
    author: 'Kate Chopin',
  },
  {
    slug: 'my-new-book',
    title: 'My new book',
    content: "I've got a new book coming out soon",
    author: 'Kate Chopin',
  },
]

const resolvers = {
  Query: {
    articles: () => articles,
  },
}

const server = new ApolloServer({ typeDefs, resolvers })
const PORT = process.env.PORT || 4000

server.listen(PORT).then(({ url }) => console.log(`🚀 Server ready at ${url}`))
