const commando = require('discord.js-commando');
const request = require('request');

class FMLCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'fml',
            group: 'util',
            memberName: 'fml',
            description: 'Get a random post from FMyLife'
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
            console.log(`getting random fml`);

            request.get(`http://www.fmylife.com/random`, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    body = body.replace(/\r?\n|\r/g,``);
                    var reply = body.substring(body.indexOf(`<p class="block"><a href="/article/`)+35);
                    reply = reply.substring(reply.indexOf(`">`)+2);
                    reply = reply.substring(0, reply.indexOf(`</a>`));
                    if (reply.includes(`<span class="`) && reply.includes(`"></span>&nbsp;`)) {
                        reply = reply.substring(reply.indexOf(`"></span>&nbsp;`)+15);
                    }
                    message.reply(reply.trim());
                } else {
                    message.reply(`I have a great life`);
                }
            });

            console.log(`done getting random fml`);
            message.channel.stopTyping();
        }
    }
}

module.exports = FMLCommand;