const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const expressPlayground = require('graphql-playground-middleware-express').default
const dotenv = require('dotenv')

dotenv.config()

const port = process.env.PORT

const app = express()

// Middleware
const { createJwtToken, authenticate } = require('./middleware')

app.get('/auth', (req, res) => {
  const data = {
    time: Date(),
    userId: 12345
  }
  const token = createJwtToken(data)
  
  res.json({ token })
})

app.get('/playground', expressPlayground({ endpoint: '/query' }));

app.use(authenticate)

// GraphQL
// Construct a schema, using GraphQL schema language
const schema = require('./graphql/schema')

// The root provides a resolver function for each API endpoint
const resolvers = require('./graphql/resolver')

const connectDB = require('./repository/db')

connectDB()

const context = async req => {
  const user = req.user
  return { uid: user.id }
}

app.use('/query', graphqlHTTP( req => {
  return {
    schema,
    rootValue: resolvers,
    context: context(req)
  }
}))


app.listen(port)
console.log(`Server started on port ${port}`)
// --legacy-peer-deps
