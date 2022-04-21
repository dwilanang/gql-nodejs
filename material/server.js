const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const expressPlayground = require('graphql-playground-middleware-express').default;
const dotenv = require('dotenv');

dotenv.config();

const { PORT } = process.env
// Middleware
const middleware = require('../middleware');

// Construct a schema, using GraphQL schema language
const schemas = require('./schema');

// The root provides a resolver function for each API endpoint
const resolvers = require('./resolver');

const context = async req => {
  const { authorization: token } = req.headers;

  return { token };
};

var app = express();
app.use(middleware);
app.use('/graphql', middleware, graphqlHTTP({
  schema: schemas,
  rootValue: resolvers,
  context: (req) => context(req)
}));
app.get('/auth', (req, res)=>{
  const token = require('../jwt');
  res.json({token: token}) 
});
app.get('/playground', expressPlayground({ endpoint: '/graphql' }));
app.listen(PORT);
console.log('Running a GraphQL API server at http://localhost:${PORT}/graphql');