const { PageModel } = require('../models');

const repoPage = {
    fetch: async (context) => {
        const ctx = await context
        var items = [];
        
        const pages = await PageModel.find({ userid: ctx.uid })
    
        pages.forEach(function(page) {
            items.push({
                identity: page.identity,
                name: page.name,
            });
        });
    
        return items
    },
    add: async (context, args) => {
        const ctx = await context
        try {
            var input = {
                userid: ctx.uid,
                identity: args.params.identity,
                name: args.params.name,
            }
            
            const res = await new PageModel(input).save()

            return res
        } catch (error) {
            console.error("add error > ", error)
            return null
        }
    },
}

module.exports = repoPage