require("dotenv").config();
require("events").EventEmitter.prototype._maxListeners = 100;

const Discord = require("discord.js");
const bot = new Discord.Client();
bot.login(process.env.BOT_TOKEN_KEY);

const moment = require("moment");
const SneaksAPI = require("sneaks-api");
const sneaks = new SneaksAPI();

const utils = require("../utils/utils");


module.exports = () => {
    bot.on("message", (msg) => {
        let name = msg.content.substring(8, msg.length);

        if (utils.checkPrefix(msg, `retail ${name}`)) {
            sneaks.getProducts(name, 1, (err, products) => {
                try {
                    const embed = new Discord.MessageEmbed();
                    let data = products;
                    data.slice(0, 4).forEach((retail, i) => {
                        let info = embed
                            .setImage(`${retail.thumbnail}`)
                            .setColor("#E3655B")
                            .setTitle(`${retail.shoeName}`)
                            .setDescription(
                                `Release date: ${moment(retail.releaseDate).format("LL")}`
                            )
                            .addFields({
                                name: "Retail:",
                                value: `${retail.retailPrice === undefined
                                    ? (retail.retailPrice = "N/A")
                                    : retail.retailPrice + "$"
                                    }`,
                            },
                            );
                        msg.channel.send(info);
                    });
                } catch (err) {
                    utils.errorMsg(msg, "Oops, somethings went wrong");
                }
            });
        }
    });
};
