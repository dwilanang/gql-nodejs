const { Message } = require('../../utils');
const { PageRepo } = require('../../repository');

const servicePage = {
    fetchPage: async (_, context) => {
        const ctx = await context

        var items = PageRepo.fetch(ctx);

        return { items: items };
    },
    addPage: async (args, context) => {
        const ctx = await context

        var message = Message.Success
        var res = await PageRepo.add(ctx, args)

        if (res == null || typeof(res) == "undefined") {
            message = Message.Fail
        }
        return { message: message };
    }
};

module.exports = servicePage;