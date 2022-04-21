const http = require('http');
const fs = require('fs');
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require("apollo-server-core");

const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT
const typeDefs = gql(fs.readFileSync('./graphql/schema/schema.graphql', { encoding: 'utf8' }));

const resolvers = require('./graphql/resolver/resolvers');

async function startApolloServer(typeDefs, resolvers) {
    const app = express();
    const httpServer = http.createServer(app);

    const server = new ApolloServer({
        typeDefs, 
        resolvers,
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground(),
        ],
    });
    await server.start();
    server.applyMiddleware({ app, path: '/graphql'  });

    await new Promise(resolve => httpServer.listen({ port: port }, resolve));
    console.log(`Server started on port ${port}`);
}

startApolloServer(typeDefs, resolvers)