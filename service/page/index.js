const { Message } = require('../../utils');
const { Page } = require('../../models');

const resolverPage = {
    fetchPage: async (_, context) => {
     
        // const ctx = await context

        // console.log("context > service > ", ctx.uid) 
        var items = [];

        const pages = await Page.find()

        pages.forEach(function(page) {
            items.push({
                identity: page.identity,
                name: page.name,
            });
        });

        return { items: items };
    },
    addPage: async (args, context) => {
        const ctx = await context

        // console.log("context > service > ", ctx.uid)

        const page = new Page({
            identity: args.params.identity,
            name: args.params.name,
        })
        
        var message = Message.Success
        const res = await page.save()
        if (res._id == "") {
            message = Message.Fail
        }
        return { message: message };
    }
};

module.exports = resolverPage;