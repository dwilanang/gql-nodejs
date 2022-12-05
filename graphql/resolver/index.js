const path = require('path');
const merge = require('lodash.merge');

const service = path.resolve('./service');

const pageServiceResolver = require(path.join(service, 'page'));

const resolver =  merge(
    pageServiceResolver
);

module.exports = resolver;