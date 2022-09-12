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
        if (utils.checkPrefix(msg, "nextDrop")) {
            sneaks.getProducts(moment().year(), 10, (err, products) => {
                try {
                    const embed = new Discord.MessageEmbed();
                    products.forEach((product) => {
                        let info = embed
                            .setImage(`${product.thumbnail}`)
                            .setColor("#FB6107") //colore barra
                            .setTitle(`${product.shoeName}`)
                            .addFields(
                                {
                                    name: "Retail:",
                                    value: `${product.retailPrice === undefined
                                        ? (product.retailPrice = "N/A")
                                        : product.retailPrice + "$"
                                        }`,
                                },
                                {
                                    name: "Resell:",
                                    value: "List of lowest resell prices."
                                },
                                {
                                    name: "StockX:",
                                    value: `${product.lowestResellPrice.stockX === undefined
                                        ? (product.lowestResellPrice.stockX = "N/A")
                                        : product.lowestResellPrice.stockX + "$"
                                        }`,
                                    inline: true,
                                },
                                {
                                    name: "FlightClub:",
                                    value: `${product.lowestResellPrice.flightClub === undefined
                                        ? (product.lowestResellPrice.flightClub = "N/A")
                                        : product.lowestResellPrice.flightClub + "$"
                                        }`,
                                    inline: true,
                                },
                                {
                                    name: "Goat:",
                                    value: `${product.lowestResellPrice.goat === undefined
                                        ? (product.lowestResellPrice.goat = "N/A")
                                        : product.lowestResellPrice.goat + "$"
                                        }`,
                                    inline: true,
                                }
                            )
                            .setDescription(
                                `Release date: ${moment(product.releaseDate).format("LL")}`
                            );
                        msg.channel.send(info);
                        info.fields = [];
                    });
                } catch (err) {
                    utils.errorMsg(msg, "Oops, somethings went wrong");
                }
            });
        }
    });
};
