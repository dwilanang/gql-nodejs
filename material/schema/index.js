// const { buildSchema } = require("graphql");

// const schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `);

// module.exports = schema;

const { makeExecutableSchema } = require('@graphql-tools/schema');
const { gql } = require('apollo-server');

const defaultTypeDefs = gql`
    type Query {
        hello: String
    }
`;

const createSchema = () => {
    return makeExecutableSchema({
        typeDefs: [
            defaultTypeDefs
        ],
        resolvers: merge(
            {
              hello: () => {
                return 'Hello world!';
              },
            },
        ),
    });
};

module.exports = createSchema;