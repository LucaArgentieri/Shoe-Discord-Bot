require("dotenv").config();
require("events").EventEmitter.prototype._maxListeners = 100;

const Discord = require("discord.js");
const bot = new Discord.Client();
bot.login(process.env.BOT_TOKEN_KEY);

const utils = require("../utils/utils");

module.exports = () => {
    bot.on("message", (msg) => {
        if (utils.checkPrefix(msg, "help")) {
            try {
                const embed = new Discord.MessageEmbed();
                let info = embed.setColor("#E3655B").setTitle(`Commands`).addFields(
                    {
                        name: "$help",
                        value: `For information on generic resell prices or based on the desired number.`,
                    },
                    {
                        name: "$retail + shoe name",
                        value: `To get information about a shoe at retail.`,
                    },
                    {
                        name: "$nextDrop",
                        value: `To stay updated on upcoming releases.`,
                    },
                    {
                        name: "$todayDrop",
                        value: `To stay updated on the releases of the day.`,
                    },
                    {
                        name: "$monthDrop",
                        value: `To stay updated on the releases of the current month.`,
                    },
                    {
                        name: "$infoShoesNumber + shoe name + shoes number",
                        value: `To get information about a shoe with number.`,
                    },
                    {
                        name: "$mostPopular",
                        value: `To see the most popular scapre in the last three months.`,
                    }
                );

                msg.author.send(info);
            } catch (err) {
                utils.errorMsg(msg, "Oops, somethings went wrong");
            }
        }
    });
};
