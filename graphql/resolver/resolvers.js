const merge = require('lodash.merge');

const pageService = require('../../service/page');

const Query = merge(
    {
        hello: () => 'Hello'
    },
    pageService.Query,
);

const Mutation = merge(
    {},
    pageService.Mutation,
);

module.exports = { Query, Mutation };