const pageItems = [{ identity: '1', name: 'testing' }];

const resolverPage = {
    fetchPage: async (_, context) => {
     
        var ctx = await context

        console.log("context > service > ", ctx.uid)

        return { items: pageItems };
    },
    addPage: (args, context) => {
        console.log("testing > ", args)
        return { message: "testing" };
    }
};

module.exports = resolverPage;