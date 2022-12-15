const { Message } = require('../../utils');
const { PageRepo } = require('../../repository');

const servicePage = {
    addPage: async (args, context) => {
        const ctx = await context

        var message = Message.Success
        var res = await PageRepo.add({
            uid: ctx.uid,
            identity: args.params.identity,
            name: args.params.name
        })

        if (res == null || typeof(res) == "undefined") {
            message = Message.Fail
        }
        return { message: message };
    },
    fetchPage: async (_, context) => {
        const ctx = await context

        var pages = PageRepo.fetch(ctx.uid);

        return { result: pages };
    },
    findPage: async (args) => {

        var result = PageRepo.findById(args.id);

        return {result: result};
    },
};

module.exports = servicePage;