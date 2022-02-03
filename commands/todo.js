// //add Raffle links   !addraffle + link
// bot.on("message", (msg) => {
//   if (msg.content.substr(0, 10).toLowerCase() === `${prefix}addraffle`) {
//     if (
//       msg.author.dmChannel ||
//       msg.member.roles.cache.some((role) => role.name === "pantofolaio")
//     ) {
//       var arraylist = fs.readFileSync("Links.txt", "utf8");
//       if (arraylist.length === 0) {
//         var linkRicevuto = msg.content.substr(11, msg.length);
//         if (linkRicevuto.substr(0, 5) == "https") {
//           fs.writeFile(
//             "Links.txt",
//             "<" + linkRicevuto + ">",
//             { flag: "r+" },
//             (err) => {}
//           );
//           msg.author.send("done");
//         } else {
//           msg.author.send("MA BRO, NOOO MA CHE CAZZO FAI, VOGLIO SOLO I LINK");
//         }
//       } else {
//         const linkRicevuto = msg.content.substr(11, msg.length);
//         if (linkRicevuto.substr(0, 5) == "https") {
//           let data = arraylist + "\n" + "<" + linkRicevuto + ">";
//           fs.writeFile("Links.txt", data, { flag: "r+" }, (err) => {});
//           msg.author.send("done");
//         } else {
//           msg.author.send("MA BRO, NOOO MA CHE CAZZO FAI, VOGLIO SOLO I LINK");
//         }
//       }
//     } else {
//       return msg.author.reply("Mi disp, ma non sei autorizzato.");
//     }
//   }
// });

// // Pulisci lista raffle !rr
// bot.on("message", (msg) => {
//   if (msg.content.toLowerCase() == `${prefix}rr`) {
//     if (
//       msg.author.dmChannel ||
//       msg.member.roles.cache.some((role) => role.name === "pantofolaio")
//     ) {
//       let linkRicevuto = "";
//       fs.writeFile("Links.txt", linkRicevuto, { flag: "w" }, (err) => {});

//       msg.author.send(`Lista pulita`);
//     } else {
//       return msg.author.reply("Mi disp, ma non sei autorizzato.");
//     }
//   }
// });

// //Elenco lista Raffle !raffle
// bot.on("message", (msg) => {
//   if (msg.content.toLowerCase() == `${prefix}raffle`) {
//     if (
//       msg.author.dmChannel ||
//       msg.member.roles.cache.some((role) => role.name === "pantofolaio")
//     ) {
//       var arraylist = fs.readFileSync("Links.txt", "utf8");
//       console.log(arraylist);
//       if (arraylist.length == 0) {
//         msg.author.send(
//           "\n Mi spiace, al momento non ci sono raffle disponibili!"
//         );
//       } else msg.author.send(`Ecco i link per le raffle:\r\n` + `${arraylist}`);
//     } else {
//       return msg.author.reply("Mi disp, ma non sei autorizzato.");
//     }
//   }
// });

// //prezzo info !info
// bot.on("message", (msg) => {
//   if (msg.content.substr(0, 5).toLowerCase() === `${prefix}info`) {
//     if (
//       msg.author.dmChannel ||
//       msg.member.roles.cache.some((role) => role.name === "pantofolaio")
//     ) {
//       const x = msg.content.substr(5, msg.length);
//       let filter = (m) => m.author.id === msg.author.id;

//       if (x.length <= 5) {
//         msg.channel.send(`Devi inserire il nome di una scarpa`);
//         return;
//       }

//       msg.channel.send(
//         `Desideri cercare un numero specifico? Se si digita ${prefix} + numero altrimenti digita ${prefix}no`
//       );

//       msg.channel
//         .awaitMessages(filter, {
//           max: 1,
//           time: 30000,
//           errors: ["time"],
//         })

//         .then((msg) => {
//           msg = msg.first();

//           if (msg.content === `${prefix}no`) {
//             sneaks.getProducts(x, function (err, products) {
//               try {
//                 const embed = new Discord.MessageEmbed();

//                 products.forEach(function (resell) {
//                   console.log(resell);
//                   let info = embed
//                     .setImage(`${resell.thumbnail}`)
//                     .setColor("#CFD186") //colore barra
//                     .setTitle(`${resell.shoeName}`)
//                     .addFields(
//                       {
//                         name: "Prezzo retail:",
//                         value: `${
//                           resell.retailPrice === undefined
//                             ? (resell.retailPrice = "N/A")
//                             : resell.retailPrice + "$"
//                         }`,
//                       },
//                       {
//                         name: "Prezzi di resell",
//                         value: "del paio piu bassi avvenuti nei seguenti siti",
//                       },
//                       {
//                         name: "StockX:",
//                         value: `${
//                           resell.lowestResellPrice.stockX === undefined
//                             ? (resell.lowestResellPrice.stockX = "N/A")
//                             : resell.lowestResellPrice.stockX + "$"
//                         }`,
//                         inline: true,
//                       },
//                       {
//                         name: "FlightClub:",
//                         value: `${
//                           resell.lowestResellPrice.flightClub === undefined
//                             ? (resell.lowestResellPrice.flightClub = "N/A")
//                             : resell.lowestResellPrice.flightClub + "$"
//                         }`,
//                         inline: true,
//                       },
//                       {
//                         name: "Goat:",
//                         value: `${
//                           resell.lowestResellPrice.goat === undefined
//                             ? (resell.lowestResellPrice.goat = "N/A")
//                             : resell.lowestResellPrice.goat + "$"
//                         }`,
//                         inline: true,
//                       },
//                       {
//                         name: "StadiumGoods:",
//                         value: `${
//                           resell.lowestResellPrice.stadiumGoods === undefined
//                             ? (resell.lowestResellPrice.stadiumGoods = "N/A")
//                             : resell.lowestResellPrice.stadiumGoods + "$"
//                         }`,
//                         inline: true,
//                       }
//                     )
//                     .setDescription(
//                       `Data Release: ${moment(resell.releaseDate).format("LL")}`
//                     );

//                   msg.channel.send(info);
//                   info.fields = [];
//                 });
//               } catch (err) {
//                 console.error(err);
//                 msg.channel.send(`Errore ${err}`);
//               } finally {
//                 return;
//               }
//             });
//             return; // per bloccare il codice e non far cercare per numero
//           }

//           if (msg.content >= `${prefix}4` || msg.content <= `${prefix}18`) {
//             let numeroRicevuto = msg.content.substr(1, msg.length);

//             sneaks.getProducts(x, function (err, products) {
//               if (numeroRicevuto == 35.5) {
//                 numeroRicevuto = 4;
//               } else if (numeroRicevuto == 36) {
//                 numeroRicevuto = 4.5;
//               } else if (numeroRicevuto == 36.5) {
//                 numeroRicevuto = 5;
//               } else if (numeroRicevuto == 37) {
//                 numeroRicevuto = 5;
//               } else if (numeroRicevuto == 37.5) {
//                 numeroRicevuto = 5.5;
//               } else if (numeroRicevuto == 38) {
//                 numeroRicevuto = 6;
//               } else if (numeroRicevuto == 38.5) {
//                 numeroRicevuto = 6;
//               } else if (numeroRicevuto == 39) {
//                 numeroRicevuto = 6.5;
//               } else if (numeroRicevuto == 40) {
//                 numeroRicevuto = 7;
//               } else if (numeroRicevuto == 40.5) {
//                 numeroRicevuto = 7.5;
//               } else if (numeroRicevuto == 41) {
//                 numeroRicevuto = 8;
//               } else if (numeroRicevuto == 42) {
//                 numeroRicevuto = 8.5;
//               } else if (numeroRicevuto == 42.5) {
//                 numeroRicevuto = 9;
//               } else if (numeroRicevuto == 43) {
//                 numeroRicevuto = 9.5;
//               } else if (numeroRicevuto == 44) {
//                 numeroRicevuto = 10;
//               } else if (numeroRicevuto == 44.5) {
//                 numeroRicevuto = 10.5;
//               } else if (numeroRicevuto == 45) {
//                 numeroRicevuto = 11;
//               } else if (numeroRicevuto == 45.5) {
//                 numeroRicevuto = 11.5;
//               } else if (numeroRicevuto == 46) {
//                 numeroRicevuto = 12;
//               } else if (numeroRicevuto == 47) {
//                 numeroRicevuto = 12.5;
//               } else if (numeroRicevuto == 47.5) {
//                 numeroRicevuto = 13;
//               } else if (numeroRicevuto == 48) {
//                 numeroRicevuto = 13.5;
//               } else if (numeroRicevuto == 48.5) {
//                 numeroRicevuto = 14;
//               } else if (numeroRicevuto == 49 || numeroRicevuto == 49.5) {
//                 numeroRicevuto = 15;
//               } else if (numeroRicevuto == 50 || numeroRicevuto == 50.5) {
//                 numeroRicevuto = 16;
//               } else if (numeroRicevuto == 51 || numeroRicevuto == 51.5) {
//                 numeroRicevuto = 17;
//               } else if (numeroRicevuto == 52 || numeroRicevuto == 52.5) {
//                 numeroRicevuto = 18;
//               }

//               try {
//                 const embed = new Discord.MessageEmbed();

//                 products.forEach(function (resell) {
//                   //Prende l'id scarpa e lo usiamo per cercare il singolo prezzo in base al numero di scarpa
//                   sneaks.getProductPrices(
//                     resell.styleID,
//                     function (err, resell2) {
//                       console.log(resell2);
//                       let info = embed
//                         .setImage(`${resell.thumbnail}`)
//                         .setColor("#CFD186") //colore barra
//                         .setTitle(
//                           `${resell.shoeName}\nNumero selezionato: ${numeroRicevuto}`
//                         )
//                         .addFields(
//                           {
//                             name: "Prezzo retail:",
//                             value: `${
//                               resell.retailPrice === undefined
//                                 ? (resell.retailPrice = "N/A")
//                                 : resell.retailPrice + "$"
//                             }`,
//                           },

//                           {
//                             name: "Prezzi di resell",
//                             value:
//                               "del paio piu bassi avvenuti nei seguenti siti",
//                           },

//                           {
//                             name: "StockX:",
//                             value: `${
//                               resell2.resellPrices.stockX[numeroRicevuto] ===
//                               undefined
//                                 ? (resell2.resellPrices.stockX = "N/A")
//                                 : resell2.resellPrices.stockX[numeroRicevuto] +
//                                   "$"
//                             }`,
//                             inline: true,
//                           },

//                           {
//                             name: "FlightClub:",
//                             value: `${
//                               resell2.resellPrices.flightClub[
//                                 numeroRicevuto
//                               ] === undefined
//                                 ? (resell2.resellPrices.flightClub = "N/A")
//                                 : resell2.resellPrices.flightClub[
//                                     numeroRicevuto
//                                   ] + "$"
//                             }`,
//                             inline: true,
//                           },

//                           {
//                             name: "Goat:",
//                             value: `${
//                               resell2.resellPrices.goat === undefined ||
//                               resell2.resellPrices.goat[numeroRicevuto] ===
//                                 undefined
//                                 ? (resell2.resellPrices.goat = "N/A")
//                                 : resell2.resellPrices.goat[numeroRicevuto] +
//                                   "$"
//                             }`,
//                             inline: true,
//                           },

//                           {
//                             name: "StadiumGoods:",
//                             value: `${
//                               resell2.resellPrices.stadiumGoods[
//                                 numeroRicevuto
//                               ] === undefined
//                                 ? (resell2.resellPrices.stadiumGoods = "N/A")
//                                 : resell2.resellPrices.stadiumGoods[
//                                     numeroRicevuto
//                                   ] + "$"
//                             }`,
//                             inline: true,
//                           }
//                         )
//                         .setDescription(
//                           `Data Release: ${
//                             resell.releaseDate === null
//                               ? (resell.releaseDate = "Data non disponibile")
//                               : moment(resell.releaseDate).format("LL")
//                           }`
//                         );

//                       msg.author.send(info);
//                       info.fields = [];
//                     }
//                   );
//                 });
//               } catch (err) {
//                 console.error(err);
//                 msg.channel.send(`Errore ${err}`);
//               } finally {
//                 return;
//               }
//             });
//           } else {
//             msg.channel.send(
//               `Reinserisci il comando inserendo un numero compreso tra 4 e 17`
//             );
//             return;
//           }
//         })
//         .catch((collected) => {
//           msg.channel.send("Tempo scaduto");
//         });
//     } else {
//       return msg.author.reply("Mi disp, ma non sei autorizzato.");
//     }
//   }
// });
