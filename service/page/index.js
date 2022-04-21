const pageItems = { identity: '1', name: 'testing' };

const Query = {
    fetchPage: () => {
        return { items: [pageItems] };
    }
}

const Mutation = {
    addPage: (parent, args, context, info) => {
  
        return { message: "testing" };
    }
}

module.exports = { Query, Mutation };