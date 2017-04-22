const commando = require('discord.js-commando');
const request = require('request');

class StatsCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'stats',
            group: 'games',
            memberName: 'stats',
            description: 'Get Hypixel stats for a player'
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
            var args = arg.split(" ");
            if (args.length == 2) {
                var name = args[0];
                var game = args[1];
                var id;

                message.channel.startTyping();
                console.log(`getting ${game} stats for ${name}`);
                
                if (game.toUpperCase() == "CSGO" || game.toUpperCase() == "CS") {
                    request.get(`http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=60B1549B3B96739AB3572BB0486B54CE&vanityurl=${name}`, function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            if (JSON.parse(body).response.success == 1) {
                                id = JSON.parse(body).response.steamid;
                            } else {
                                id = name;
                            }
                        } else {
                            id = name;
                        }

                        
                        request.get(`http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=60B1549B3B96739AB3572BB0486B54CE&steamid=${id}`, function(error, response, body) {
                            if (!error && response.statusCode == 200) {
                                var stats = JSON.parse(body).playerstats.stats;
                                
                                var total_kills = 0;
                                var total_deaths = 0;
                                var total_time_played = 0;
                                var total_wins = 0;
                                var total_mvps = 0;

                                var kd = 0;
                                var accuracy = 0;
                                var headshot_percentage = 0;

                                var total_shots_hit = 0;
                                var total_shots_fired = 0;
                                var total_kills_headshot = 0;
                                

                                stats.forEach(function(stat) {
                                    switch (stat.name) {
                                        case "total_kills":
                                            total_kills = stat.value;
                                            break;
                                        case "total_deaths":
                                            total_deaths = stat.value;
                                            break;
                                        case "total_wins":
                                            total_wins = stat.value;
                                            break;
                                        case "total_mvps":
                                            total_mvps = stat.value;
                                            break;
                                        case "total_shots_hit":
                                            total_shots_hit = stat.value;
                                            break;
                                        case "total_shots_fired":
                                            total_shots_fired = stat.value;
                                            break;
                                        case "total_kills_headshot":
                                            total_kills_headshot = stat.value;
                                            break;
                                        default:
                                            break;
                                    }
                                });

                                if (!(total_kills == 0 || total_deaths == 0)) {
                                    kd = total_kills / total_deaths;
                                    kd = Math.round(kd * 100) / 100;
                                }

                                if (!(total_shots_fired == 0 || total_shots_hit == 0)) {
                                    accuracy = total_shots_hit / total_shots_fired;
                                    accuracy = Math.round(accuracy * 100);
                                }

                                if (total_kills != 0 && total_kills_headshot != 0) {
                                    headshot_percentage = total_kills_headshot / total_kills;
                                    headshot_percentage = Math.round(headshot_percentage * 100);
                                }

                                var ret = `Total Round Wins: ${total_wins}\nTotal Kills: ${total_kills}\nKill/Death: ${kd}\n\nTotal Accuracy: ${accuracy}%\nHeadshot Percentage: ${headshot_percentage}%`;

                                message.reply(`Here are ${name}'s stats for CS:GO`, {embed: {
                                    color: 16724016,
                                    description: ret,
                                    thumbnail: {url: `https://pkrhosting.co.uk/images/csgo_icon-240x240.png`}
                                }})
                            } else {
                                message.reply(`There was a problem getting stats for ${name} in ${game}`);
                                console.log(`${error}::${response.statusCode}`);
                            }
                        });
                    });
                } else {
                    request.get(`http://hypixel.kerbybit.com/stats/${game}/${name}.txt`, function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            if (body.startsWith("Error: ")) {
                                message.reply(body);
                            } else {
                                var stats = body.substring(1, body.length-1).split(",");
                                var game = stats.shift();
                                var ret = "";

                                stats.forEach(function(stat) {
                                    if (stat.includes(":")) {
                                        stat = `**${stat.replace(":", ":**")}`;
                                    } else if (stat != "") {
                                        stat = `**${stat}**`;
                                    }
                                    ret += `${stat}\n`;
                                });

                                message.reply( `Here are ${name}'s Hypixel stats for ${game}`, {embed: {
                                    color: 8602356,
                                    description: ret,
                                    thumbnail: {url: `https://minotar.net/helm/${name}/100`}
                                }});
                            }
                        } else {
                            message.reply(`There was a problem getting stats for ${name} in ${game}`);
                            console.log(`${error}::${response.statusCode}`);
                        }
                    });
                }

                console.log(`done getting stats for ${name} in ${game}`);
                message.channel.stopTyping();
            } else {
                message.reply("Use !stats <username> <game>")
            }
        }
    }
}

module.exports = StatsCommand;