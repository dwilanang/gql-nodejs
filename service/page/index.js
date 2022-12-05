const { Message } = require('../../utils');
const { PageRepo } = require('../../repository');

const servicePage = {
    fetchPage: async (_, context) => {
        var items = PageRepo.fetch(context);

        return { items: items };
    },
    addPage: async (args, context) => {
        var message = Message.Success
        var res = await PageRepo.add(context, args)

        if (res == null || typeof(res) == "undefined") {
            message = Message.Fail
        }
        return { message: message };
    }
};

module.exports = servicePage;