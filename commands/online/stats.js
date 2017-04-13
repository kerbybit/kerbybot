const commando = require('discord.js-commando');
const request = require('request');

class StatsCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'stats',
            group: 'online',
            memberName: 'stats',
            description: 'Get Hypixel stats for a player'
        });
    }

    async run(message, arg) {
        var args = arg.split(" ");
        if (args.length == 2) {
            var name = args[0];
            var game = args[1];

            message.reply("getting stats for " + name);
            message.channel.startTyping();
            
            request.get("http://hypixel.kerbybit.com/stats/" + game + "/" + name + ".txt", function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    message.reply( "here are " + name + "'s stats for " + body.substring(1,body.length-1).replace(/,/g,"\n"));
                }
            });

            message.channel.stopTyping();
        } else {
            message.reply("use !stats <username> <game>")
        }
    }
}

module.exports = StatsCommand;