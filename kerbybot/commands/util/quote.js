const commando = require('discord.js-commando');

class QuoteCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'quote',
            group: 'util',
            memberName: 'quote',
            description: 'Quote a user in the channel using the message id'
        });
    }

    async run(message, arg) {
        //do nothing
    }
}

module.exports = QuoteCommand;