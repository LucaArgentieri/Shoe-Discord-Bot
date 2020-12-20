require('dotenv').config();
var moment = require('moment');
const SneaksAPI = require('sneaks-api');
const sneaks = new SneaksAPI();
require('events').EventEmitter.prototype._maxListeners = 100;
const { Console, error } = require('console');
const Discord = require("discord.js");
const bot = new Discord.Client();
var fs = require('fs');
const prefix = "!"
bot.login(process.env.DISCORD_KEY);

//Console.log Chat (per i dev)
bot.on('message', (message) => {
    console.log(`[${message.author.tag}]: ${message.content}`)
});

// command check
bot.on('message', (msg) => {
    if (msg.content.toLocaleLowerCase().includes(`${prefix}`)) {
        return
    } else {
        if (msg.author.tag !== "Pantofole#4586") {
            msg.channel.send(`Inserisci un comando valido, se hai bisogno di aiuto digita !help`)
        }
    }
})

//Presentati !ciao
bot.on('message', (msg) => {
    if (msg.content.toLowerCase() == `${prefix}ciao`) {
        msg.channel.send('AO mo che so qui te aggiorno sulle paia, basta che me lo chiedi, scrivi !help per conoscere piu comandi *wink wink* :wink::wink::wink:  ');
    }
});

//Help !help
bot.on('message', (msg) => {
    if (msg.content.toLowerCase() == `${prefix}help`) {
        msg.channel.send('Ciao i comandi disponibili per questo bot sono:\n' + '```!presentati - non lo sappiamo nemmeno noi, provalo.\n!addlinks - per aggiungere i link per le raffle.\n!raffle - per elencare tutti i siti per iscriversi alle raffle in caso ti fossi perso qualche link.```');
    }
});

//add Raffle links   !addraffle + link
bot.on('message', (msg) => {
    if (msg.content.substr(0, 10).toLowerCase() === `${prefix}addraffle`) {
        var arraylist = fs.readFileSync('Links.txt', 'utf8');
        if (arraylist.length === 0) {
            var linkRicevuto = msg.content.substr(11, msg.length);
            if (linkRicevuto.substr(0, 5) == "https") {
                fs.writeFile('Links.txt', "<" + linkRicevuto + ">", { flag: 'r+' }, err => { });
                msg.channel.send("done")
            } else {
                msg.channel.send("MA BRO, NOOO MA CHE CAZZO FAI, VOGLIO SOLO I LINK")
            }
        }
        else {
            const linkRicevuto = msg.content.substr(11, msg.length);
            if (linkRicevuto.substr(0, 5) == "https") {
                let data = arraylist + ("\n") + "<" + linkRicevuto + ">";
                fs.writeFile('Links.txt', data, { flag: 'r+' }, err => { });
                msg.channel.send("done")
            } else {
                msg.channel.send("MA BRO, NOOO MA CHE CAZZO FAI, VOGLIO SOLO I LINK")
            }

        }

    }
});

// Pulisci lista raffle !rr
bot.on('message', (msg) => {
    if (msg.content.toLowerCase() == `${prefix}rr`) {
        let linkRicevuto = "";
        fs.writeFile('Links.txt', linkRicevuto, { flag: 'w' }, err => { });

        msg.channel.send(`Lista pulita`);
    }

});

//Elenco lista Raffle !raffle
bot.on('message', (msg) => {
    if (msg.content.toLowerCase() == `${prefix}raffle`) {
        var arraylist = fs.readFileSync('Links.txt', 'utf8')
        console.log(arraylist)
        if (arraylist.length == 0) {
            msg.channel.send('\n Mi spiace, al momento non ci sono raffle disponibili!')
        } else
            msg.channel.send(`Ecco i link per le raffle:\r\n` + `${arraylist}`);
    }

});


//prezzo retail !retail (FIXARE PROBLEMA CON SLICE)
bot.on('message', (msg) => {
    if (msg.content.substr(0, 7).toLowerCase() === `${prefix}retail`) {
        const x = msg.content.substr(7, msg.length);
        if (x.length <= 7) {
            msg.channel.send(`Devi inserire il nome di una scarpa`);
            return
        } else {
            sneaks.getProducts(x, function (err, products) {
                try {

                    const embed = new Discord.MessageEmbed()

                    let data = products
                    data.slice(0, 4).forEach(function (retail, i) {

                        let info = embed.setImage(`${retail.thumbnail}`)
                            .setTitle(`${retail.shoeName}`)
                            .setDescription(`Prezzo retail: ${(retail.retailPrice === undefined) ? retail.retailPrice = 'N/A' : retail.retailPrice + '$'}` + "\n" + `Data Release: ${moment(retail.releaseDate).format('LL')}`);
                        msg.channel.send(info)
                    });

                } catch (err) {
                    console.error(err);
                    msg.channel.send(`Errore ${err}`);
                } finally {
                    return
                }
            })
        }
    }
});

//prezzo info !info
bot.on('message', (msg) => {
    if (msg.content.substr(0, 5).toLowerCase() === `${prefix}info`) {

        const x = msg.content.substr(5, msg.length);
        let filter = m => m.author.id === msg.author.id

        if (x.length <= 5) {
            msg.channel.send(`Devi inserire il nome di una scarpa`);
            return
        }

        msg.channel.send(`Desideri cercare un numero specifico? Se si digita ${prefix} + numero altrimenti digita ${prefix}no`)


        msg.channel.awaitMessages(filter, {
            max: 1,
            time: 30000,
            errors: ['time']
        })

            .then(msg => {
                msg = msg.first()

                if (msg.content === `${prefix}no`) {
                    sneaks.getProducts(x, function (err, products) {
                        try {
                            const embed = new Discord.MessageEmbed()

                            products.forEach(function (resell) {
                                console.log(resell);
                                let info = embed
                                    .setImage(`${resell.thumbnail}`)
                                    .setColor('#0099ff')     //colore barra          
                                    .setTitle(`${resell.shoeName}`)
                                    .addFields(
                                        { name: 'Prezzo retail', value: `${(resell.retailPrice === undefined) ? resell.retailPrice = 'N/A' : resell.retailPrice + '$'}` },
                                        { name: 'Prezzi di resell', value: 'del paio piu bassi avvenuti nei seguenti siti' },
                                        { name: 'StockX:', value: `${(resell.lowestResellPrice.stockX === undefined) ? resell.lowestResellPrice.stockX = 'N/A' : resell.lowestResellPrice.stockX + '$'}`, inline: true },
                                        { name: 'FlightClub:', value: `${(resell.lowestResellPrice.flightClub === undefined) ? resell.lowestResellPrice.flightClub = 'N/A' : resell.lowestResellPrice.flightClub + '$'}`, inline: true },
                                        { name: 'Goat:', value: `${(resell.lowestResellPrice.goat === undefined) ? resell.lowestResellPrice.goat = 'N/A' : resell.lowestResellPrice.goat + '$'}`, inline: true },
                                        { name: 'StadiumGoods:', value: `${(resell.lowestResellPrice.stadiumGoods === undefined) ? resell.lowestResellPrice.stadiumGoods = 'N/A' : resell.lowestResellPrice.stadiumGoods + '$'}`, inline: true },
                                    )
                                    .setDescription(`Data Release: ${moment(resell.releaseDate).format('LL')}`);

                                msg.channel.send(info)
                                info.fields = [];

                            })

                        } catch (err) {
                            console.error(err);
                            msg.channel.send(`Errore ${err}`);
                        } finally {
                            return
                        }
                    })
                    return // per bloccare il codice e non far cercare per numero
                }


                if (msg.content > `${prefix}3` || msg.content < `${prefix}18`) {
                    let numeroRicevuto = msg.content.substr(1, msg.length)


                    sneaks.getProducts(x, function (err, products) {

                        try {

                            const embed = new Discord.MessageEmbed()

                            products.forEach(function (resell) {

                                //Prende l'id scarpa e lo usiamo per cercare il singolo prezzo in base al numero di scarpa
                                sneaks.getProductPrices(resell.styleID, function (err, resell2) {
                                    console.log(resell2)
                                    let info = embed
                                        .setImage(`${resell.thumbnail}`)
                                        .setColor('#0099ff')     //colore barra          
                                        .setTitle(`${resell.shoeName}\nNumero selezionato: ${numeroRicevuto}`)
                                        .addFields(
                                            { name: 'Prezzo retail', value: `${(resell.retailPrice === undefined) ? resell.retailPrice = 'N/A' : resell.retailPrice + '$'}` },
                                            { name: 'Prezzi di resell', value: 'del paio piu bassi avvenuti nei seguenti siti' },

                                            { name: 'StockX:', value: `${(resell2.resellPrices.stockX === undefined) ? resell2.resellPrices.stockX = 'N/A' : resell2.resellPrices.stockX[numeroRicevuto] + '$'}`, inline: true },

                                            { name: 'FlightClub:', value: `${(resell2.resellPrices.flightClub === undefined) ? resell2.resellPrices.flightClub = 'N/A' : resell2.resellPrices.flightClub[numeroRicevuto] + '$'}`, inline: true },

                                            { name: 'Goat:', value: `${(resell2.resellPrices.goat === undefined) ? resell2.resellPrices.goat = 'N/A' : resell2.resellPrices.goat[numeroRicevuto] + '$'}`, inline: true },

                                            { name: 'StadiumGoods:', value: `${(resell2.lowestResellPrice.stadiumGoods === undefined) ? resell2.lowestResellPrice.stadiumGoods = 'N/A' : resell2.lowestResellPrice.stadiumGoods + '$'}`, inline: true },
                                        )
                                        .setDescription(`Data Release: ${moment(resell.releaseDate).format('LL')}`);

                                    msg.channel.send(info)
                                    info.fields = [];
                                })
                            })
                        } catch (err) {
                            console.error(err);
                            msg.channel.send(`Errore ${err}`);
                        } finally {
                            return
                        }
                    })

                } else {
                    msg.channel.send(`Reinserisci il comando inserendo un numero compreso tra 4 e 17`)
                    return
                }
            })
            .catch(collected => {
                msg.channel.send('Tempo scaduto');
            });

    }
});





//prossime release !newrelease
bot.on('message', (msg) => {
    if (msg.content.toLowerCase() === `${prefix}newrelease`) {

        const embed = new Discord.MessageEmbed()


        let info = embed
            .setImage('https://i.pinimg.com/originals/65/ba/48/65ba488626025cff82f091336fbf94bb.gif')
            .setTitle('Attendere..')

        msg.channel.send(info);

        var oggi = new Date()
        var giorno = oggi.getFullYear() + '-' + (oggi.getMonth() + 1) + '-' + ("0" + oggi.getDate()).slice(-2);

        sneaks.getProducts(giorno, function (err, products) {
            try {
                msg.channel.send('Ecco a te le prossime uscite')
                setTimeout(() => {
                    products.forEach(function (prossimo) {
                        let info = embed
                            .setImage(`${prossimo.thumbnail}`)
                            .setColor('#008000')     //colore barra          
                            .setTitle(`${prossimo.shoeName}`)
                            .addFields(
                                { name: 'Prezzo retail:', value: `${(prossimo.retailPrice === undefined) ? prossimo.retailPrice = 'N/A' : prossimo.retailPrice + '$'}` },
                                { name: 'Prezzi di resell', value: 'del paio piu bassi avvenuti nei seguenti siti' },
                                { name: 'StockX:', value: `${(prossimo.lowestResellPrice.stockX === undefined) ? prossimo.lowestResellPrice.stockX = 'N/A' : prossimo.lowestResellPrice.stockX + '$'}`, inline: true },
                                { name: 'FlightClub:', value: `${(prossimo.lowestResellPrice.flightClub === undefined) ? prossimo.lowestResellPrice.flightClub = 'N/A' : prossimo.lowestResellPrice.flightClub + '$'}`, inline: true },
                                { name: 'Goat:', value: `${(prossimo.lowestResellPrice.goat === undefined) ? prossimo.lowestResellPrice.goat = 'N/A' : prossimo.lowestResellPrice.goat + '$'}`, inline: true },
                                { name: 'StadiumGoods:', value: `${(prossimo.lowestResellPrice.stadiumGoods === undefined) ? prossimo.lowestResellPrice.stadiumGoods = 'N/A' : prossimo.lowestResellPrice.stadiumGoods + '$'}`, inline: true },
                            )
                            .setDescription(`Data Release: ${moment(prossimo.releaseDate).format('LL')}`);

                        msg.channel.send(info)
                        info.fields = [];
                    })
                }, 2000);
            } catch (err) {
                console.error(err);
                msg.channel.send(`Errore ${err}`);
            } finally {
                return
            }
        })
    }
});

//release del mese !dropmese (AGGIUNGERE AWAIT)
bot.on('message', (msg) => {
    if (msg.content.toLowerCase() === `${prefix}dropmese`) {
        var oggi = new Date()
        var qstmese = oggi.getMonth() + 1;
        var qstanno = oggi.getFullYear();
        var x = qstanno + '-' + qstmese;
        console.log(qstanno)
        sneaks.getProducts(x, function (err, products) {
            try {
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
                                { name: 'Prezzo retail:', value: `${(prossimo.retailPrice === undefined) ? prossimo.retailPrice = 'N/A' : prossimo.retailPrice + '$'}` },
                                { name: 'Prezzi di resell', value: 'del paio piu bassi avvenuti nei seguenti siti' },
                                { name: 'StockX:', value: `${(prossimo.lowestResellPrice.stockX === undefined) ? prossimo.lowestResellPrice.stockX = 'N/A' : prossimo.lowestResellPrice.stockX + '$'}`, inline: true },
                                { name: 'FlightClub:', value: `${(prossimo.lowestResellPrice.flightClub === undefined) ? prossimo.lowestResellPrice.flightClub = 'N/A' : prossimo.lowestResellPrice.flightClub + '$'}`, inline: true },
                                { name: 'Goat:', value: `${(prossimo.lowestResellPrice.goat === undefined) ? prossimo.lowestResellPrice.goat = 'N/A' : prossimo.lowestResellPrice.goat + '$'}`, inline: true },
                                { name: 'StadiumGoods:', value: `${(prossimo.lowestResellPrice.stadiumGoods === undefined) ? prossimo.lowestResellPrice.stadiumGoods = 'N/A' : prossimo.lowestResellPrice.stadiumGoods + '$'}`, inline: true },
                            )
                            .setDescription(`Data Release: ${moment(prossimo.releaseDate).format('LL')}`);

                        msg.channel.send(info)
                        info.fields = [];
                    }
                })
            } catch (err) {
                console.error(err);
                msg.channel.send(`Errore ${err}`);
            } finally {
                return
            }
        })
    }
});

//Scarpe stonks ultimi 3 mesi !stonks (AGGIUNGERE AWAIT, RISOLVERE PROBLEMA SCARPE UGUALI)
bot.on('message', (msg) => {
    if (msg.content.toLowerCase() == `${prefix}stonks`) {
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
            try {
                msg.channel.send('Ecco a te le scarpe più popolari degli ultimi 3 mesi')
                setTimeout(() => {
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
                                    { name: 'Prezzo retail:', value: `${(stonks.retailPrice === undefined) ? stonks.retailPrice = 'N/A' : stonks.retailPrice + '$'}` },
                                    { name: 'Prezzi di resell', value: 'del paio piu bassi avvenuti nei seguenti siti' },
                                    { name: 'StockX:', value: `${(stonks.lowestResellPrice.stockX === undefined) ? stonks.lowestResellPrice.stockX = 'N/A' : stonks.lowestResellPrice.stockX + '$'}`, inline: true },
                                    { name: 'FlightClub:', value: `${(stonks.lowestResellPrice.flightClub === undefined) ? stonks.lowestResellPrice.flightClub = 'N/A' : stonks.lowestResellPrice.flightClub + '$'}`, inline: true },
                                    { name: 'Goat:', value: `${(stonks.lowestResellPrice.goat === undefined) ? stonks.lowestResellPrice.goat = 'N/A' : stonks.lowestResellPrice.goat + '$'}`, inline: true },
                                    { name: 'StadiumGoods:', value: `${(stonks.lowestResellPrice.stadiumGoods === undefined) ? stonks.lowestResellPrice.stadiumGoods + 'N/A' : stonks.lowestResellPrice.stadiumGoods + '$'}`, inline: true },
                                )
                                .setDescription(`Data Release: ${moment(stonks.releaseDate).format('LL')}`);

                            msg.channel.send(info)
                            info.fields = [];

                        }
                    })
                }, 2000);
            } catch (err) {
                console.error(err);
                msg.channel.send(`Errore ${err}`);
            } finally {
                return
            }
        });
    }

});

