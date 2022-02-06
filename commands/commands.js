require("dotenv").config();
require("events").EventEmitter.prototype._maxListeners = 100;
let moment = require("moment");
let fs = require("fs");
const SneaksAPI = require("sneaks-api");
const sneaks = new SneaksAPI();
const Discord = require("discord.js");
const bot = new Discord.Client();
const prefix = "$";
bot.login(process.env.BOT_TOKEN_KEY);

const checkPrefix = (msg, command) => {
  return msg.content === `${prefix}${command}`;
};

const errorMsg = (msg, text) => {
  msg.author.send(text);
};

const debug = () => {
  //Use me for debug
};

const help = () => {
  bot.on("message", (msg) => {
    if (checkPrefix(msg, "help")) {
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
        errorMsg(msg, "Oops, somethings went wrong");
      }
    }
  });
};

const nextDrop = () => {
  bot.on("message", (msg) => {
    if (checkPrefix(msg, "nextDrop")) {
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
                  value: `${
                    product.retailPrice === undefined
                      ? (product.retailPrice = "N/A")
                      : product.retailPrice + "$"
                  }`,
                },
                {
                  name: "Resell",
                  value: "del paio piu bassi avvenuti nei seguenti siti",
                },
                {
                  name: "StockX:",
                  value: `${
                    product.lowestResellPrice.stockX === undefined
                      ? (product.lowestResellPrice.stockX = "N/A")
                      : product.lowestResellPrice.stockX + "$"
                  }`,
                  inline: true,
                },
                {
                  name: "FlightClub:",
                  value: `${
                    product.lowestResellPrice.flightClub === undefined
                      ? (product.lowestResellPrice.flightClub = "N/A")
                      : product.lowestResellPrice.flightClub + "$"
                  }`,
                  inline: true,
                },
                {
                  name: "Goat:",
                  value: `${
                    product.lowestResellPrice.goat === undefined
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
          errorMsg(msg, "Oops, somethings went wrong");
        }
      });
    }
  });
};

const retail = () => {
  bot.on("message", (msg) => {
    let name = msg.content.substring(8, msg.length);

    if (checkPrefix(msg, `retail ${name}`)) {
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
                value: `${
                  retail.retailPrice === undefined
                    ? (retail.retailPrice = "N/A")
                    : retail.retailPrice + "$"
                }`,
              });
            msg.channel.send(info);
          });
        } catch (err) {
          errorMsg(msg, "Oops, somethings went wrong");
        }
      });
    }
  });
};

const mostPopular = () => {
  bot.on("message", (msg) => {
    if (checkPrefix(msg, "mostPopular")) {
      const embed = new Discord.MessageEmbed();
      sneaks.getMostPopular(10, (err, products) => {
        try {
          products.forEach(function (product) {
            let info = embed
              .setImage(`${product.thumbnail}`)
              .setColor("#F2D7EE") //colore barra
              .setTitle(`${product.shoeName}`)
              .addFields(
                {
                  name: "Retail:",
                  value: `${
                    product.retailPrice === undefined
                      ? (product.retailPrice = "N/A")
                      : product.retailPrice + "$"
                  }`,
                },
                {
                  name: "Resell",
                  value: "lowest offer in these sites.",
                },
                {
                  name: "StockX:",
                  value: `${
                    product.lowestResellPrice.stockX === undefined
                      ? (product.lowestResellPrice.stockX = "N/A")
                      : product.lowestResellPrice.stockX + "$"
                  }`,
                  inline: true,
                },
                {
                  name: "FlightClub:",
                  value: `${
                    product.lowestResellPrice.flightClub === undefined
                      ? (product.lowestResellPrice.flightClub = "N/A")
                      : product.lowestResellPrice.flightClub + "$"
                  }`,
                  inline: true,
                },
                {
                  name: "Goat:",
                  value: `${
                    product.lowestResellPrice.goat === undefined
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
          errorMsg(msg, "Oops, somethings went wrong");
        }
      });
    }
  });
};

const monthDrop = () => {
  bot.on("message", (msg) => {
    if (checkPrefix(msg, "monthDrop")) {
      let thisYearMonth = moment().format("YYYY-MM");

      sneaks.getProducts(thisYearMonth, 20, (err, products) => {
        const filteredProducts = products.filter(
          (product) =>
            product.releaseDate.substring(7, 0) === thisYearMonth.toString()
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
                  value: `${
                    prossimo.retailPrice === undefined
                      ? (prossimo.retailPrice = "N/A")
                      : prossimo.retailPrice + "$"
                  }`,
                },
                {
                  name: "Resell",
                  value: "lowest offer in these sites.",
                },
                {
                  name: "StockX:",
                  value: `${
                    prossimo.lowestResellPrice.stockX === undefined
                      ? (prossimo.lowestResellPrice.stockX = "N/A")
                      : prossimo.lowestResellPrice.stockX + "$"
                  }`,
                  inline: true,
                },
                {
                  name: "FlightClub:",
                  value: `${
                    prossimo.lowestResellPrice.flightClub === undefined
                      ? (prossimo.lowestResellPrice.flightClub = "N/A")
                      : prossimo.lowestResellPrice.flightClub + "$"
                  }`,
                  inline: true,
                },
                {
                  name: "Goat:",
                  value: `${
                    prossimo.lowestResellPrice.goat === undefined
                      ? (prossimo.lowestResellPrice.goat = "N/A")
                      : prossimo.lowestResellPrice.goat + "$"
                  }`,
                  inline: true,
                }
              )
              .setDescription(
                `Release date: ${moment(prossimo.releaseDate).format("LL")}`
              );

            msg.channel.send(info);
            info.fields = [];
          });
        } catch (err) {
          errorMsg(msg, "Oops, somethings went wrong");
        }
      });
    }
  });
};

const todayDrop = () => {
  bot.on("message", (msg) => {
    if (checkPrefix(msg, "todayDrop")) {
      let thisYearMonth = moment().format("YYYY-MM-DD");

      sneaks.getProducts(thisYearMonth, 20, (err, products) => {
        const filteredProducts = products.filter(
          (product) =>
            product.releaseDate.substring(10, 0) === thisYearMonth.toString()
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
                  value: `${
                    prossimo.retailPrice === undefined
                      ? (prossimo.retailPrice = "N/A")
                      : prossimo.retailPrice + "$"
                  }`,
                },
                {
                  name: "Resell",
                  value: "lowest offer in these sites.",
                },
                {
                  name: "StockX:",
                  value: `${
                    prossimo.lowestResellPrice.stockX === undefined
                      ? (prossimo.lowestResellPrice.stockX = "N/A")
                      : prossimo.lowestResellPrice.stockX + "$"
                  }`,
                  inline: true,
                },
                {
                  name: "FlightClub:",
                  value: `${
                    prossimo.lowestResellPrice.flightClub === undefined
                      ? (prossimo.lowestResellPrice.flightClub = "N/A")
                      : prossimo.lowestResellPrice.flightClub + "$"
                  }`,
                  inline: true,
                },
                {
                  name: "Goat:",
                  value: `${
                    prossimo.lowestResellPrice.goat === undefined
                      ? (prossimo.lowestResellPrice.goat = "N/A")
                      : prossimo.lowestResellPrice.goat + "$"
                  }`,
                  inline: true,
                }
              )
              .setDescription(
                `Data Release: ${moment(prossimo.releaseDate).format("LL")}`
              );

            msg.channel.send(info);
            info.fields = [];
          });
        } catch (err) {
          errorMsg(msg, "Oops, somethings went wrong");
        }
      });
    }
  });
};

const infoShoesNumber = () => {
  bot.on("message", (msg) => {
    let message = msg.content.split(" ", msg.length);
    //Remove Command
    message.shift();
    //Remove number
    let number = message.pop();
    //Separate Shoes
    let shoes = message.join(" ");

    if (checkPrefix(msg, `infoShoesNumber ${shoes} ${number}`)) {
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
                      value: `${
                        product.retailPrice === undefined
                          ? (product.retailPrice = "N/A")
                          : product.retailPrice + "$"
                      }`,
                    },
                    {
                      name: "Resell",
                      value: "lowest offer in these sites.",
                    },
                    {
                      name: "StockX:",
                      value: `${
                        product.resellPrices.stockX[number] === undefined
                          ? (product.resellPrices.stockX = "N/A")
                          : product.resellPrices.stockX[number] + "$"
                      }`,
                      inline: true,
                    },
                    {
                      name: "FlightClub:",
                      value: `${
                        product.resellPrices.flightClub[number] === undefined
                          ? (product.resellPrices.flightClub = "N/A")
                          : product.resellPrices.flightClub[number] + "$"
                      }`,
                      inline: true,
                    },
                    {
                      name: "Goat:",
                      value: `${
                        product.resellPrices.goat === undefined ||
                        product.resellPrices.goat[number] === undefined
                          ? (product.resellPrices.goat = "N/A")
                          : product.resellPrices.goat[number] + "$"
                      }`,
                      inline: true,
                    }
                  )
                  .setDescription(
                    `Release date: ${
                      product.releaseDate === null
                        ? (product.releaseDate = "Date not available.")
                        : moment(product.releaseDate).format("LL")
                    }`
                  );
                msg.channel.send(info);

                info.fields = [];
              });
            });
          } catch (err) {
            errorMsg(msg, "Oops, somethings went wrong");
          }
        });
      } else {
        msg.channel.send(
          `Re-enter the command by entering a number between 4 and 17`
        );
      }
    }
  });
};

module.exports = {
  debug,
  help,
  nextDrop,
  retail,
  mostPopular,
  monthDrop,
  todayDrop,
  infoShoesNumber,
};
