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

// Year
let qstanno = moment().year();
// let prossimoMese =
//   qstanno + 1 + "-" + (qstmese == 12 ? (qstmese = "01") : qstmese + 1);

const debug = () => {
  // sneaks.getProducts("2022", 1, function (err, products) {
  //   console.log(products);
  // });
};

const help = () => {
  bot.on("message", (msg) => {
    if (checkPrefix(msg, "help")) {
      try {
        const embed = new Discord.MessageEmbed();
        let info = embed
          .setColor("#E3655B")
          .setTitle(`Lista comandi`)
          .addFields(
            {
              name: "$help",
              value: `Per avere informazioni dei prezzi di resell generici oppure in base al numero desiderato.`,
            },
            {
              name: "$nextDrop",
              value: `Per rimanere aggiornato sulle uscite del prossimo mese.`,
            },
            {
              name: "$mostPopular",
              value: `Per vedere le scapre più popolari negli ultimi tre mesi.`,
            },
            {
              name: "$monthDrop",
              value: `This month drops.`,
            }
          );

        msg.author.send(info);
      } catch (err) {
        errorMsg(msg, "Ops, qualcosa è andato storto.");
      }
    }
  });
};

const nextDrop = () => {
  bot.on("message", (msg) => {
    if (checkPrefix(msg, "nextDrop")) {
      sneaks.getProducts(qstanno, 10, (err, products) => {
        try {
          const embed = new Discord.MessageEmbed();
          products.forEach((product) => {
            let info = embed
              .setImage(`${product.thumbnail}`)
              .setColor("#FB6107") //colore barra
              .setTitle(`${product.shoeName}`)
              .addFields(
                {
                  name: "Prezzo retail:",
                  value: `${
                    product.retailPrice === undefined
                      ? (product.retailPrice = "N/A")
                      : product.retailPrice + "$"
                  }`,
                },
                {
                  name: "Prezzi di resell",
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
                },
                {
                  name: "StadiumGoods:",
                  value: `${
                    product.lowestResellPrice.stadiumGoods === undefined
                      ? (product.lowestResellPrice.stadiumGoods = "N/A")
                      : product.lowestResellPrice.stadiumGoods + "$"
                  }`,
                  inline: true,
                }
              )
              .setDescription(
                `Data Release: ${moment(product.releaseDate).format("LL")}`
              );
            msg.channel.send(info);
            info.fields = [];
          });
        } catch (err) {
          errorMsg(msg, "Ops, qualcosa è andato storto.");
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
                `Data Release: ${moment(retail.releaseDate).format("LL")}`
              )
              .addFields({
                name: "Prezzo retail:",
                value: `${
                  retail.retailPrice === undefined
                    ? (retail.retailPrice = "N/A")
                    : retail.retailPrice + "$"
                }`,
              });
            msg.channel.send(info);
          });
        } catch (err) {
          errorMsg(msg, "Ops, qualcosa è andato storto.");
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
                  name: "Prezzo retail:",
                  value: `${
                    product.retailPrice === undefined
                      ? (product.retailPrice = "N/A")
                      : product.retailPrice + "$"
                  }`,
                },
                {
                  name: "Prezzi di resell",
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
                `Data Release: ${moment(product.releaseDate).format("LL")}`
              );
            msg.channel.send(info);
            info.fields = [];
          });
        } catch (err) {
          errorMsg(msg, "Ops, qualcosa è andato storto.");
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
                  name: "Prezzo retail:",
                  value: `${
                    prossimo.retailPrice === undefined
                      ? (prossimo.retailPrice = "N/A")
                      : prossimo.retailPrice + "$"
                  }`,
                },
                {
                  name: "Prezzi di resell",
                  value: "del paio piu bassi avvenuti nei seguenti siti",
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
          errorMsg(msg, "Ops, qualcosa è andato storto.");
        }
      });
    }
  });
};

// TODO
//Today relase
//Info shoes number

module.exports = { debug, help, nextDrop, retail, mostPopular, monthDrop };
