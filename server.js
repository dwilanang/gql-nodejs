const path = require('path');
const express = require('express');
// const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const expressPlayground = require('graphql-playground-middleware-express').default;

const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT

var app = express();

// Cors
// app.use(cors());

// Middleware
const middlewarePath = path.resolve('./middleware');
const { createJwtToken, authenticate } = require(path.join(middlewarePath, "auth"));

app.get('/auth', (req, res)=>{
  let data = {
    time: Date(),
    userId: 2,
  }
  const token =  createJwtToken(data);

  res.json({token: token}) 
});

app.use(authenticate);

// GraphQL
// Construct a schema, using GraphQL schema language
const schema = require('./graphql/schema');

// The root provides a resolver function for each API endpoint
const resolvers = require('./graphql/resolver');

const context = async req => {
  const user = req.user;
  
  return { uid: user.id };
};



app.use('/query', graphqlHTTP((req, res, graphQLParams) => {
  return {
      schema: schema,
      rootValue: resolvers,
      context: context(req)
    };
}));

app.get('/playground', expressPlayground({ endpoint: '/query' }));
app.listen(port);
console.log(`Server started on port ${port}`);

// --legacy-peer-deps