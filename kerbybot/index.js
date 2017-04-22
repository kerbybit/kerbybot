const commando = require('discord.js-commando');
const bot = new commando.Client();

var askedYT = [];
var channelToAskYT = [
    119493402902528000,
    171717932605243392,
    119493489388945408,
    119493506971598848,
    302561144520966144,
    171831933205086228,
    271365869899218954
];
var messages = [];

console.log("Bot started");

bot.registry.registerGroup('games', 'Games');
bot.registry.registerGroup('util', 'Utility');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

bot.on('message', (message) => {
    if (message.author.id == '110613985954365440' || message.author.id == '110601458772123648') {
        if (message.content == 'bot') {
            message.channel.send('land');
        }
    }

    messages.push(message);

    if (message.content.startsWith("!quote")) {
        var arg = message.content.substring(message.content.indexOf("!quote")+7, message.content.length).trim();
        if (arg.includes(" ") || arg == "") {
            message.reply("Use !quote <message id>");
        } else {
            var got_quote = false;
            messages.forEach(function(get_message) {
                if (arg == get_message.id && message.channel == get_message.channel) {
                    got_quote = true;
                    message.channel.sendEmbed({
                        color: 3447003,
                        author: {
                            name: get_message.author.username,
                            icon_url: get_message.author.avatarURL
                        },
                        description: get_message.content,
                        timestamp: new Date()
                    });
                }
            });
            if (!got_quote) {
                message.reply("I did not find that message ID");
            }
        }
    }

    if (message.channel.name != undefined) {
        if (message.channel.name.includes("bot")) {
            if (message.content.startsWith("%?")) {
                message.reply(`Joris says ${Math.floor((Math.random()*100)+1)}%`)
            }
        }
    }

    /*if (message.channel != undefined) {
        if (channelToAskYT.indexOf(message.channel.id) != -1) {
            if (message.content.toUpperCase().includes("HOW") && message.content.toUpperCase().includes("GET")) {
                if (message.content.toUpperCase().includes("YOUTUBE") || message.content.toUpperCase().includes("YT")) {
                    //asking for yt rank
                    var asked = false;
                    askedYT.forEach(function(entry) {
                        if (entry == message.author.id) {
                            asked = true;
                        }
                    });

                    if (!asked) {
                        askedYT.put(message.author.id);
                        message.reply("You can get a **client side** youtube rank by running the command ```/t import YoutubeRank```ChatTriggers is much more than just a rank changer. I urge you to take a look at our imports page over at http://ct.kerbybit.com/imports to check out a bunch of awesome packs to download. I pinned a few to the #imports channel that a lot of people use already :)");
                    }
                }
            }
        }
    }*/
});

bot.login('MzAyMDk0Njc0MDQwOTc5NDU3.C9EjHQ.DUaLTXhF2ZPFlrj-H2XC_NbsnVQ');