const commando = require('discord.js-commando');
const bot = new commando.Client();

console.log("Bot started");

bot.registry.registerGroup('online', 'Online');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

bot.on('message', (message) => {
    if (message.author.id == '110613985954365440' || message.author.id == '110601458772123648') {
        if (message.content == 'bot') {
            message.channel.send('land');
        }
    }
});

bot.login('###########################################################');