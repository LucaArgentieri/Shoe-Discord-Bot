// Code from the precedent release

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
