const commando = require('discord.js-commando');
const request = require('request');

class FactCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'fact',
            group: 'util',
            memberName: 'fact',
            description: 'Get a random fact from online using magic'
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
            console.log(`getting random fact`);

            request.get(`http://randomfactgenerator.net/`, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var reply = body.substring(body.indexOf(`<div id='z'>`)+12);
                    reply = reply.substring(0, reply.indexOf(`<br/><br/>`));
                    message.reply(reply);
                } else {
                    message.reply(`lol I dont know any facts`);
                }
            });

            console.log(`done getting random fact`);
            message.channel.stopTyping();
        }
    }
}

module.exports = FactCommand;