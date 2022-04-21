const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { ApolloServerPluginLandingPageGraphQLPlayground,
    ApolloServerPluginLandingPageDisabled } = require('apollo-server-core');

const dotenv = require('dotenv');
const { isDevelopment } = require('../env');

const schema = require('./schema');

dotenv.config();

const port = process.env.PORT

const typeDefs = gql`
    type Query {
        hello: String
    }
`

const resolvers = {
    Query: {
        hello: function(){
            return 'Hallo'
        }
    }
}

(async () =>{
    const context = await createContext();
    const server = new ApolloServer({
        plugins: [
            process.env.NODE_ENV === 'production'
                ? ApolloServerPluginLandingPageDisabled()
                : ApolloServerPluginLandingPageGraphQLPlayground(),
        ],
        schema: schema(),
        context: async () => {
            return {
                ...context
            };
        },
    });
    await server.start();
    const app = express();
    server.applyMiddleware({ app });
    const svr = app.listen({ port }, ()=>{
        console.log(`server ready at http://localhost:${port}`)
    });
    svr.setTimeout(600000);
})().catch(error => {
    console.log(error);
});
