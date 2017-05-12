const commando = require('discord.js-commando');
const request = require('request');

class PickupCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'pickup',
            group: 'util',
            memberName: 'pickup',
            description: 'Generate a random pickup line'
        });
    }

    async run(message, arg) {
        var do_command = true;
        if (message.editedTimestamp != null) {
            do_command = false;
        }
        if (message.channel.name!=undefined) {
            if (!message.channel.name.includes("bot")) {
                do_command = false;
            }
        }

        if (do_command) {
            message.channel.startTyping();
            console.log(`getting random pickupline`);

            request.get(`http://www.pickuplinegen.com/`, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var reply = body.substring(body.indexOf(`<div id="content">`)+18).trim();
                    reply = reply.substring(0, reply.indexOf(`</div>`));
                    message.reply(reply.trim().replace(/(\[&quot;|&quot\])/g, `"`));
                } else {
                    message.reply(`I'm gay`);
                }
            });

            console.log(`done getting random pickupline`);
            message.channel.stopTyping();
        }
    }
}

module.exports = PickupCommand;
