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
        if (utils.checkPrefix(msg, "monthDrop")) {
            let thisYearMonth = moment().format("YYYY-MM");

            sneaks.getProducts(thisYearMonth, 20, (err, products) => {
                const filteredProducts = products.filter(
                    (product) =>
                        product.releaseDate.substring(7, 0) === thisYearMonth.toString()
                );

                try {
                    const embed = new Discord.MessageEmbed();

                    filteredProducts.forEach((prod) => {
                        let info = embed
                            .setImage(`${prod.thumbnail}`)
                            .setColor("#69306D") //colore barra
                            .setTitle(`${prod.shoeName}`)
                            .addFields(
                                {
                                    name: "Retail:",
                                    value: `${prod.retailPrice === undefined
                                        ? (prod.retailPrice = "N/A")
                                        : prod.retailPrice + "$"
                                        }`,
                                },
                                {
                                    name: "Resell:",
                                    value: "List of lowest resell prices."
                                },
                                {
                                    name: "StockX:",
                                    value: `${prod.lowestResellPrice.stockX === undefined
                                        ? (prod.lowestResellPrice.stockX = "N/A")
                                        : prod.lowestResellPrice.stockX + "$"
                                        }`,
                                    inline: true,
                                },
                                {
                                    name: "FlightClub:",
                                    value: `${prod.lowestResellPrice.flightClub === undefined
                                        ? (prod.lowestResellPrice.flightClub = "N/A")
                                        : prod.lowestResellPrice.flightClub + "$"
                                        }`,
                                    inline: true,
                                },
                                {
                                    name: "Goat:",
                                    value: `${prod.lowestResellPrice.goat === undefined
                                        ? (prod.lowestResellPrice.goat = "N/A")
                                        : prod.lowestResellPrice.goat + "$"
                                        }`,
                                    inline: true,
                                }
                            )
                            .setDescription(
                                `Release date: ${moment(prod.releaseDate).format("LL")}`
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