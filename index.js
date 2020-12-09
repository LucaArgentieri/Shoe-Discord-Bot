require('dotenv').config();
const SneaksAPI = require('sneaks-api');
const sneaks = new SneaksAPI();
const { Console } = require('console');
const Discord = require("discord.js");
const bot = new Discord.Client();
var fs = require('fs');

bot.login(process.env.DISCORD_KEY);


bot.on('message', (msg) => {        //Presentati
    if (msg.content.toLowerCase() == '!ciao') {
        msg.reply('AO mo che so qui te aggiorno sulle paia, basta che me lo chiedi, scrivi !help per conoscere piu comandi *wink wink* :wink::wink::wink:  ');
    }
});
bot.on('message', (msg) => {        //Help
    if (msg.content.toLowerCase() == '!help') {
        msg.reply('Ciao i comandi disponibili per questo bot sono:\n' + '```!presentati - non lo sappiamo nemmeno noi, provalo.\n!addlinks - per aggiungere i link per le raffle.\n!raffle - per elencare tutti i siti per iscriversi alle raffle in caso ti fossi perso qualche link.```');
    }
});
bot.on('message', (msg) => {        //add Raffle links      
    if (msg.content.substr(0, 9).toLowerCase() === "!addlinks") {
        var arraylist = fs.readFileSync('Links.txt', 'utf8');
        if (arraylist.length === 0) {
            const x = msg.content.substr(10, msg.length);
            if (x.substr(0, 5) == "https") {
                fs.writeFile('Links.txt', "<" + x + ">", { flag: 'r+' }, err => { });
                msg.reply("done")
            } else {
                msg.reply("MA BRO, NOOO MA CHE CAZZO FAI, VOGLIO SOLO I LINK")
            }
        }
        else {
            const x = msg.content.substr(10, msg.length);
            if (x.substr(0, 5) == "https") {
                let data = arraylist + ("\n") + "<" + x + ">";
                fs.writeFile('Links.txt', data, { flag: 'r+' }, err => { });
                msg.reply("done")
            } else {
                msg.reply("MA BRO, NOOO MA CHE CAZZO FAI, VOGLIO SOLO I LINK")
            }

        }

    }
});
bot.on('message', (msg) => {        //Elenco lista Raffle
    if (msg.content.toLowerCase() == '!raffle') {
        var arraylist = fs.readFileSync('Links.txt', 'utf8')
        msg.reply(("Ecco i link per le raffle:\r\n") + arraylist);
    }

});
bot.on('message', (message) => {  //chat
    console.log(`[${message.author.tag}]: ${message.content}`)
});
bot.on('message', (msg) => {         //prezzo retail
    if (msg.content.substr(0, 7).toLowerCase() === "!retail") {
        const x = msg.content.substr(7, msg.length);
        console.log(x)
        sneaks.getProducts(x, function (err, products) {
            const embed = new Discord.MessageEmbed()

            let data = products
            data.slice(0, 4).forEach(function (retail, i) {
                let info = embed.setImage(`${retail.thumbnail}`)
                    .setTitle(`${retail.shoeName}`)
                    .setDescription(`Prezzo retail: ${retail.retailPrice}$` + "\n" + `Data Release: ${retail.releaseDate}`);
                console.log(data);
                //  msg.reply(`Il retail di queste paia ${retail.shoeName} è di: ${retail.retailPrice}$`);    
                msg.channel.send(info)
            });
        })
    }


});
bot.on('message', (msg) => {         //prezzo info
    if (msg.content.substr(0, 5).toLowerCase() === "!info") {   //info
        const x = msg.content.substr(5, msg.length);
        console.log(x)
        sneaks.getProducts(x, function (err, products) {


            const embed = new Discord.MessageEmbed()


            products.slice(0, 4).forEach(function (resell) {
                console.log(resell);
                let info = embed
                    .setImage(`${resell.thumbnail}`)
                    .setColor('#0099ff')     //colore barra          
                    .setTitle(`${resell.shoeName}`)
                    .addFields(
                        { name: 'Prezzo retail:', value: `${resell.retailPrice}$` },
                        { name: 'Prezzi di resell', value: 'del paio piu bassi avvenuti nei seguenti siti' },
                        { name: 'StockX:', value: `${resell.lowestResellPrice.stockX}$`, inline: true },
                        { name: 'FlightClub:', value: `${resell.lowestResellPrice.flightClub}$`, inline: true },
                        { name: 'Goat:', value: `${resell.lowestResellPrice.goat}$`, inline: true },
                        { name: 'StadiumGoods:', value: `${resell.lowestResellPrice.stadiumGoods}$`, inline: true },
                    )
                    .setDescription(`Data Release: ${resell.releaseDate}`);

                msg.channel.send(info)
                info.fields = [];
            })
        })
    }
});
// bot.on('message', (msg) => {         //prossime release
//     if (msg.content.toLowerCase() === "!newrelease") {   //info
//         var oggi = new Date()
//         var giorno= oggi.getFullYear()+'-'+(oggi.getMonth()+1)+'-'+("0"+ oggi.getDate()).slice(-2);
//         console.log(giorno)
//         sneaks.getProducts( function (err, products) {

//             const embed = new Discord.MessageEmbed()


//             products.forEach(function (prossimo) {
//                 console.log(resell);
//                 let info = embed
//                     .setImage(`${resell.thumbnail}`)
//                     .setColor('#0099ff')     //colore barra          
//                     .setTitle(`${resell.shoeName}`)
//                     .addFields(
//                         { name: 'Prezzo retail:', value: `${resell.retailPrice}$` },
//                         { name: 'Prezzi di resell', value: 'del paio piu bassi avvenuti nei seguenti siti' },
//                         { name: 'StockX:', value: `${resell.lowestResellPrice.stockX}$`, inline: true },
//                         { name: 'FlightClub:', value: `${resell.lowestResellPrice.flightClub}$`, inline: true },
//                         { name: 'Goat:', value: `${resell.lowestResellPrice.goat}$`, inline: true },
//                         { name: 'StadiumGoods:', value: `${resell.lowestResellPrice.stadiumGoods}$`, inline: true },
//                     )
//                     .setDescription(`Data Release: ${resell.releaseDate}`);

//                 msg.channel.send(info)
//                 info.fields = [];
//             })
//         })
//     }
// });