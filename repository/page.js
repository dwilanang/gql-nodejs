const { PageModel } = require('../models');
const { Message } = require('../utils');

var handleError = () => {
}

const repoPage = {
    add: async (args) => {
        var uid = args.uid;
        var identity = args.identity;
        var name = args.name;

        try {
            //1 : check identity is not repeated 
            const existingPageIdentity = await PageModel.findOne({identity: identity})
            if(existingPageIdentity) throw new Error(Message.FieldExists)

            //2: check name is not repeated
            const existingPageName = await PageModel.findOne({name: name})
            if(existingPageName) throw new Error(Message.FieldExists)

            //3: all is good, create
            const res = await new PageModel({
                uid: uid,
                identity: identity,
                name: name,
            }).save()

            return res;
        } catch (error) {
            handleError(error);
            throw error;
        }
    },
    fetch: async (uid) => {
        var items = [];
        
        const pages = await PageModel.find({ uid: uid })
    
        pages.forEach(function(page) {
            items.push({
                uid: page.uid,
                id: page._id,
                identity: page.identity,
                name: page.name,
            });
        });
    
        return items
    },
    findById: async (id) => {
        const page = await PageModel.findById(id)

        return page
    },
}

module.exports = repoPage