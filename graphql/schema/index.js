const path = require('path');
const fs = require('fs');
const { buildSchema } = require("graphql");

const schemaGraphql = fs.readFileSync(path.join(__dirname, 'schema.graphql'), { encoding: 'utf8' });

const typeDefs = buildSchema(schemaGraphql);

module.exports = typeDefs;