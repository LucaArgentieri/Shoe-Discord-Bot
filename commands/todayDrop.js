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
        if (utils.checkPrefix(msg, "todayDrop")) {
            let thisYearMonth = moment().format("YYYY-MM-DD");

            sneaks.getProducts(thisYearMonth, 20, (err, products) => {
                const filteredProducts = products.filter(
                    (product) => product.releaseDate.substring(10, 0) === thisYearMonth.toString()
                );


                try {
                    const embed = new Discord.MessageEmbed();


                    filteredProducts.forEach((prossimo) => {
                        let info = embed
                            .setImage(`${prossimo.thumbnail}`)
                            .setColor("#69306D") //colore barra
                            .setTitle(`${prossimo.shoeName}`)
                            .addFields(
                                {
                                    name: "Retail:",
                                    value: `${prossimo.retailPrice === undefined
                                        ? (prossimo.retailPrice = "N/A")
                                        : prossimo.retailPrice + "$"
                                        }`,
                                },
                                {
                                    name: "Resell:",
                                    value: "List of lowest resell prices.",
                                },
                                {
                                    name: "StockX:",
                                    value: `${prossimo.lowestResellPrice.stockX === undefined
                                        ? (prossimo.lowestResellPrice.stockX = "N/A")
                                        : prossimo.lowestResellPrice.stockX + "$"
                                        }`,
                                    inline: true,
                                },
                                {
                                    name: "FlightClub:",
                                    value: `${prossimo.lowestResellPrice.flightClub === undefined
                                        ? (prossimo.lowestResellPrice.flightClub = "N/A")
                                        : prossimo.lowestResellPrice.flightClub + "$"
                                        }`,
                                    inline: true,
                                },
                                {
                                    name: "Goat:",
                                    value: `${prossimo.lowestResellPrice.goat === undefined
                                        ? (prossimo.lowestResellPrice.goat = "N/A")
                                        : prossimo.lowestResellPrice.goat + "$"
                                        }`,
                                    inline: true,
                                }
                            )
                            .setDescription(`Data Release: ${moment(prossimo.releaseDate).format("LL")}`);

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
