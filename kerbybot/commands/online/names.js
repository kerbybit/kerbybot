const commando = require('discord.js-commando');
const request = require('request');

class NamesCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'names',
            group: 'games',
            memberName: 'names',
            description: 'Get previous Minecraft usernames'
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
            if (arg.includes(" ") || arg == "") {
                message.reply("User !names <username>");
            } else {
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
                    } else {
                        message.reply("I could not find that username!");
                        console.log(`${error}::${response.statusCose}`);
                    }
                });

                message.channel.stopTyping();
            }
        }
    }
}

module.exports = NamesCommand;