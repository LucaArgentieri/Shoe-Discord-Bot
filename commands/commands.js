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
      if (number == 35.5) {
        number = 4;
      } else if (number == 36) {
        number = 4.5;
      } else if (number == 36.5) {
        number = 5;
      } else if (number == 37) {
        number = 5;
      } else if (number == 37.5) {
        number = 5.5;
      } else if (number == 38) {
        number = 6;
      } else if (number == 38.5) {
        number = 6;
      } else if (number == 39) {
        number = 6.5;
      } else if (number == 40) {
        number = 7;
      } else if (number == 40.5) {
        number = 7.5;
      } else if (number == 41) {
        number = 8;
      } else if (number == 42) {
        number = 8.5;
      } else if (number == 42.5) {
        number = 9;
      } else if (number == 43) {
        number = 9.5;
      } else if (number == 44) {
        number = 10;
      } else if (number == 44.5) {
        number = 10.5;
      } else if (number == 45) {
        number = 11;
      } else if (number == 45.5) {
        number = 11.5;
      } else if (number == 46) {
        number = 12;
      } else if (number == 47) {
        number = 12.5;
      } else if (number == 47.5) {
        number = 13;
      } else if (number == 48) {
        number = 13.5;
      } else if (number == 48.5) {
        number = 14;
      } else if (number == 49 || number == 49.5) {
        number = 15;
      } else if (number == 50 || number == 50.5) {
        number = 16;
      } else if (number == 51 || number == 51.5) {
        number = 17;
      } else if (number == 52 || number == 52.5) {
        number = 18;
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
                  .setTitle(
                    `${product.shoeName}\nNumero selezionato: ${number}`
                  )
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
                    `Data Release: ${
                      product.releaseDate === null
                        ? (product.releaseDate = "Data non disponibile")
                        : moment(product.releaseDate).format("LL")
                    }`
                  );
                msg.channel.send(info);

                info.fields = [];
              });
            });
          } catch (err) {
            console.error(err);
          }
        });
      } else {
        msg.channel.send(
          `Reinserisci il comando inserendo un numero compreso tra 4 e 17`
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
