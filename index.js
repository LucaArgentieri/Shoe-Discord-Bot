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
            let data = products;
            console.log(data[0]);
            msg.reply(`Il retail di queste paia è di: ${data[0].retailPrice}$`);
        })
    }


});
bot.on('message', (msg) => {         //prezzo resell
    if (msg.content.substr(0, 7).toLowerCase() === "!resell") {
        const x = msg.content.substr(7, msg.length);
        console.log(x)
        sneaks.getProducts(x, function (err, products) {
            // console.log(data[0]);
            // msg.reply(`Il resell delle paia ${data[0].shoeName} è di:`+"```"+`${data[0].lowestResellPrice}(valori in Dollari)`+ "```"+`${data[0].thumbnail}`);
            products.slice(0, 4).forEach(function (resell, i) {
                console.log(resell);
                msg.reply(`Resell delle paia ${resell.shoeName} uscite a retail a ` + `${resell.retailPrice}$` + ` è di; ` + "\n" + `StockX:  ${resell.lowestResellPrice.stockX}$` + "\n" + `FlightClub:  ${resell.lowestResellPrice.flightClub}$` + "\n" + `Goat:  ${resell.lowestResellPrice.goat}$` + "\n" + `StadiumGoods:  ${resell.lowestResellPrice.stadiumGoods}$` + "\n" + `${resell.thumbnail}`)
            })
        })
    }


});