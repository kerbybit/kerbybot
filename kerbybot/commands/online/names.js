const commando = require('discord.js-commando');
const request = require('request');

class NamesCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'names',
            group: 'online',
            memberName: 'names',
            description: 'Get previous Minecraft usernames'
        });
    }

    async run(message, arg) {
        if (arg.includes(" ") || arg == "") {
            message.reply("User !names <username>");
        } else {
            message.reply(`Getting previous usernames for ${arg}`);

            message.channel.startTyping();

            request.get(`https://api.mojang.com/users/profiles/minecraft/${arg}`, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var uuid = JSON.parse(body).id;

                    request.get(`https://api.mojang.com/user/profiles/${uuid}/names`, function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            var obj = JSON.parse(body);
                            var ret = "";

                            obj.forEach(function(element) {
                                ret += `${element.name.replace(/_/g,"\\_")}\n`
                            });

                            message.reply(`Here are ${arg}'s previous Minecraft usernames\n`, {embed: {
                                color: 3447003,
                                description: ret,
                                thumbnail: {url: `https://minotar.net/helm/${arg}/100`}
                            }});
                        }
                    });
                }
            });

            message.channel.stopTyping();
        }
    }
}

module.exports = NamesCommand;