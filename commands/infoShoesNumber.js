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
        let message = msg.content.split(" ", msg.length);
        //Remove Command
        message.shift();
        //Remove number
        let number = message.pop();
        //Separate Shoes
        let shoes = message.join(" ");

        if (utils.checkPrefix(msg, `infoShoesNumber ${shoes} ${number}`)) {
            //Number conversion

            switch (number) {
                case number == 35.5:
                    number = 4;
                    break;
                case number == 36:
                    number = 4.5;
                    break;
                case number == 36.5:
                    number = 5;
                    break;
                case number == 37:
                    number = 5;
                    break;
                case number == 37.5:
                    number = 5.5;
                    break;
                case number == 38:
                    number = 6;
                    break;
                case number == 38.5:
                    number = 6;
                    break;
                case number == 39:
                    number = 6.5;
                    break;
                case number == 40:
                    number = 7;
                    break;
                case number == 40.5:
                    number = 7.5;
                    break;
                case number == 41:
                    number = 8;
                    break;
                case number == 42:
                    number = 8.5;
                    break;
                case number == 42.5:
                    number = 9;
                    break;
                case number == 42.5:
                    number = 9;
                    break;
                case number == 43:
                    number = 9.5;
                    break;
                case number == 44:
                    number = 10;
                    break;
                case number == 44.5:
                    number = 10.5;
                    break;
                case number == 45:
                    number = 11;
                    break;
                case number == 45.5:
                    number = 11.5;
                    break;
                case number == 46:
                    number = 12;
                    break;
                case number == 47:
                    number = 12.5;
                    break;
                case number == 47.5:
                    number = 13;
                    break;
                case number == 48:
                    number = 13.5;
                    break;
                case number == 48.5:
                    number = 14;
                    break;
                case number == 49 || number == 49.5:
                    number = 15;
                    break;
                case number == 50 || number == 50.5:
                    number = 16;
                    break;
                case number == 51 || number == 51.55:
                    number = 17;
                    break;
                case number == 52 || number == 52.5:
                    number = 18;
                    break;

                default:
                    break;
            }

            if (number >= 4 || number <= 18) {
                sneaks.getProducts(shoes, 1, (err, products) => {
                    try {
                        const embed = new Discord.MessageEmbed();
                        products.forEach((resell) => {
                            sneaks.getProductPrices(resell.styleID, (err, product) => {
                                let info = embed
                                    .setImage(`${product.thumbnail}`)
                                    .setColor("#CFD186") //colore barra
                                    .setTitle(`${product.shoeName}\nSelected number: ${number}`)
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
                                            value: "List of lowest resell prices.",
                                        },
                                        {
                                            name: "StockX:",
                                            value: `${product.lowestResellPrice.stockX === undefined
                                                ? "N/A"
                                                : product.lowestResellPrice.stockX + "$"
                                                }`,
                                            inline: true,
                                        },
                                        {
                                            name: "FlightClub:",
                                            value: `${product.lowestResellPrice.flightClub === undefined
                                                ? "N/A"
                                                : product.lowestResellPrice.flightClub + "$"
                                                }`,
                                            inline: true,
                                        },
                                        {
                                            name: "Goat:",
                                            value: `${product.lowestResellPrice.goat === undefined
                                                ? "N/A"
                                                : product.lowestResellPrice.goat + "$"
                                                }`,
                                            inline: true,
                                        },
                                        {
                                            name: "Resell:",
                                            value: "List of latest resell prices.",
                                        },
                                        {
                                            name: "StockX:",
                                            value: `${product.resellPrices.stockX[number] === undefined
                                                ? (product.resellPrices.stockX = "N/A")
                                                : product.resellPrices.stockX[number] + "$"
                                                }`,
                                            inline: true,
                                        },
                                        {
                                            name: "FlightClub:",
                                            value: `${product.resellPrices.flightClub === undefined ||
                                                product.resellPrices.flightClub[number] === undefined
                                                ? (product.resellPrices.flightClub = "N/A")
                                                : product.resellPrices.flightClub[number] + "$"
                                                }`,
                                            inline: true,
                                        },
                                        {
                                            name: "Goat:",
                                            value: `${product.resellPrices.goat === undefined ||
                                                product.resellPrices.goat[number] === undefined
                                                ? (product.resellPrices.goat = "N/A")
                                                : product.resellPrices.goat[number] + "$"
                                                }`,
                                            inline: true,
                                        }
                                    )
                                    .setDescription(
                                        `Release date: ${product.releaseDate === null
                                            ? (product.releaseDate = "Date not available.")
                                            : moment(product.releaseDate).format("LL")
                                        }`
                                    );
                                msg.channel.send(info);

                                info.fields = [];
                            });
                        });
                    } catch (err) {
                        utils.errorMsg(msg, "Oops, somethings went wrong");
                    }
                });
            } else {
                msg.channel.send(`Re-enter the command by entering a number between 4 and 17`);
            }
        }
    });
};
