require('dotenv').config();
var moment = require('moment');
const SneaksAPI = require('sneaks-api');
const sneaks = new SneaksAPI();
require('events').EventEmitter.prototype._maxListeners = 100;
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
    if (msg.content.substr(0, 10).toLowerCase() === "!addraffle") {
        var arraylist = fs.readFileSync('Links.txt', 'utf8');
        if (arraylist.length === 0) {
            var linkRicevuto = msg.content.substr(11, msg.length);
            if (linkRicevuto.substr(0, 5) == "https") {
                fs.writeFile('Links.txt', "<" + linkRicevuto + ">", { flag: 'r+' }, err => { });
                msg.reply("done")
            } else {
                msg.reply("MA BRO, NOOO MA CHE CAZZO FAI, VOGLIO SOLO I LINK")
            }
        }
        else {
            const linkRicevuto = msg.content.substr(11, msg.length);
            if (linkRicevuto.substr(0, 5) == "https") {
                let data = arraylist + ("\n") + "<" + linkRicevuto + ">";
                fs.writeFile('Links.txt', data, { flag: 'r+' }, err => { });
                msg.reply("done")
            } else {
                msg.reply("MA BRO, NOOO MA CHE CAZZO FAI, VOGLIO SOLO I LINK")
            }

        }

    }
});

bot.on('message', (msg) => {        //Elenco lista Raffle
    if (msg.content.toLowerCase() == '!rr') {
        let linkRicevuto = "";
        fs.writeFile('Links.txt', linkRicevuto, { flag: 'w' }, err => { });

        msg.reply(`Lista pulita`);
    }

});


bot.on('message', (msg) => {        //Elenco lista Raffle
    if (msg.content.toLowerCase() == '!raffle') {
        var arraylist = fs.readFileSync('Links.txt', 'utf8')
        console.log(arraylist)
        if (arraylist.length == 0) {
            msg.reply('\n Mi spiace, al momento non ci sono raffle disponibili!')
        } else
            msg.reply(`Ecco i link per le raffle:\r\n` + `${arraylist}`);
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
                    .setDescription(`Prezzo retail: ${retail.retailPrice}$` + "\n" + `Data Release: ${moment(retail.releaseDate).format('LL')}`);
                console.log(data);
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
                    .setDescription(`Data Release: ${moment(resell.releaseDate).format('LL')}`);

                msg.channel.send(info)
                info.fields = [];
            })
        })
    }
});



bot.on('message', (msg) => {         //prossime release
    if (msg.content.toLowerCase() === "!newrelease") {

        const embed = new Discord.MessageEmbed()


        let info = embed
            .setImage('https://i.pinimg.com/originals/65/ba/48/65ba488626025cff82f091336fbf94bb.gif')
            .setTitle('Attendere..')
        var oggi = new Date()
        var giorno = oggi.getFullYear() + '-' + (oggi.getMonth() + 1) + '-' + ("0" + oggi.getDate()).slice(-2);
        console.log(giorno)
        sneaks.getProducts(giorno, function (err, products) {




            products.forEach(function (prossimo) {
                let info = embed
                    .setImage(`${prossimo.thumbnail}`)
                    .setColor('#008000')     //colore barra          
                    .setTitle(`${prossimo.shoeName}`)
                    .addFields(
                        { name: 'Prezzo retail:', value: `${prossimo.retailPrice}$` },
                        { name: 'Prezzi di resell', value: 'del paio piu bassi avvenuti nei seguenti siti' },
                        { name: 'StockX:', value: `${prossimo.lowestResellPrice.stockX}$`, inline: true },
                        { name: 'FlightClub:', value: `${prossimo.lowestResellPrice.flightClub}$`, inline: true },
                        { name: 'Goat:', value: `${prossimo.lowestResellPrice.goat}$`, inline: true },
                        { name: 'StadiumGoods:', value: `${prossimo.lowestResellPrice.stadiumGoods}$`, inline: true },
                    )
                    .setDescription(`Data Release: ${prossimo.releaseDate}`);

                msg.channel.send(info)
                info.fields = [];
            })
        })
    }
});

bot.on('message', (msg) => {         //release del mese
    if (msg.content.toLowerCase() === "!dropmese") {
        var oggi = new Date()
        var qstmese = oggi.getMonth() + 1;
        var qstanno = oggi.getFullYear();
        var x = qstanno + '-' + qstmese;
        console.log(qstanno)
        sneaks.getProducts(x, function (err, products) {

            const embed = new Discord.MessageEmbed()

            products.forEach(function (prossimo) {
                let m = prossimo.releaseDate.substr(-5, 2);
                let y = prossimo.releaseDate.substr(0, 4);

                if (m == qstmese) {
                    let info = embed
                        .setImage(`${prossimo.thumbnail}`)
                        .setColor('#008000')     //colore barra          
                        .setTitle(`${prossimo.shoeName}`)
                        .addFields(
                            { name: 'Prezzo retail:', value: `${prossimo.retailPrice}$` },
                            { name: 'Prezzi di resell', value: 'del paio piu bassi avvenuti nei seguenti siti' },
                            { name: 'StockX:', value: `${prossimo.lowestResellPrice.stockX}$`, inline: true },
                            { name: 'FlightClub:', value: `${prossimo.lowestResellPrice.flightClub}$`, inline: true },
                            { name: 'Goat:', value: `${prossimo.lowestResellPrice.goat}$`, inline: true },
                            { name: 'StadiumGoods:', value: `${prossimo.lowestResellPrice.stadiumGoods}$`, inline: true },
                        )
                        .setDescription(`Data Release: ${prossimo.releaseDate}`);

                    msg.channel.send(info)
                    info.fields = [];
                }
            })
        })
    }
});

bot.on('message', (msg) => {        //Scarpe stonks ultimi 3 mesi
    if (msg.content.toLowerCase() == '!stonks') {
        const embed = new Discord.MessageEmbed()
        let info = embed
            .setImage('https://i.pinimg.com/originals/65/ba/48/65ba488626025cff82f091336fbf94bb.gif')
            .setTitle('Attendere..')

        msg.channel.send(info);

        var oggi = new Date()
        var qstg = ("0" + oggi.getDate()).slice(-2)
        var qstmese = oggi.getMonth() + 1;
        var qstanno = oggi.getFullYear();
        var giorno = oggi.getFullYear() + '-' + (oggi.getMonth() + 1) + '-' + ("0" + oggi.getDate()).slice(-2);
        sneaks.getMostPopular(function (err, products) {
            msg.reply('Ecco a te le scarpe più popolari degli ultimi 3 mesi')
            products.forEach(function (stonks) {
                let d = stonks.releaseDate.substr(-2, 7);
                let m = stonks.releaseDate.substr(-5, 2);
                let y = stonks.releaseDate.substr(0, 4);
                if (y >= qstanno && m == qstmese || y >= qstanno && m == qstmese - 1 || y >= qstanno && m == qstmese - 2) {
                    let info = embed
                        .setImage(`${stonks.thumbnail}`)
                        .setColor('#f0f8ff')     //colore barra          
                        .setTitle(`${stonks.shoeName}`)
                        .addFields(
                            { name: 'Prezzo retail:', value: `${stonks.retailPrice}$` },
                            { name: 'Prezzi di resell', value: 'del paio piu bassi avvenuti nei seguenti siti' },
                            { name: 'StockX:', value: `${stonks.lowestResellPrice.stockX}$`, inline: true },
                            { name: 'FlightClub:', value: `${stonks.lowestResellPrice.flightClub}$`, inline: true },
                            { name: 'Goat:', value: `${stonks.lowestResellPrice.goat}$`, inline: true },
                            { name: 'StadiumGoods:', value: `${stonks.lowestResellPrice.stadiumGoods}$`, inline: true },
                        )
                        .setDescription(`Data Release: ${stonks.releaseDate}`);

                    msg.channel.send(info)
                    info.fields = [];
                }
            })

        });
    }

});

