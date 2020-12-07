require('dotenv').config();
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
        msg.reply('Ciao i comandi disponibili per questo bot sono: \n !presentati - non lo sappiamo nemmeno noi, provalo.');
    }
});
bot.on('message', (msg) => {        //add Raffle links      
    if (msg.content.substr(0, 9).toLowerCase() === "!addlinks") {
        var arraylist = fs.readFileSync('Links.txt', 'utf8').split('\n');
        console.log(arraylist.length);
        if (arraylist.length === 1) {
            const x = msg.content.substr(10, msg.length);
            fs.writeFile('Links.txt', x + "\r\n", { flag: 'r+' }, err => { });
            msg.reply("done")
        }
        else{
            const x = msg.content.substr(10, msg.length);
            let data = arraylist + x;
            fs.writeFile('Links.txt', data, { flag: 'r+' }, err => { });
            msg.reply("done")
            
        }

    }
});




bot.on('message', (msg) => {        //Elenco lista Raffle
    if (msg.content.toLowerCase() == '!raffle') {
        var arraylist = fs.readFileSync('Links.txt', 'utf8').split('\n');
        msg.reply(("Ecco i link per le raffle:\r\n")+arraylist);
    }

});
bot.on('message', (message) => {  //chat
    console.log(`[${message.author.tag}]: ${message.content}`)
});

bot.on('message', (msg) => {        //Svuota lista
    
    if (msg.content.toLowerCase() == '!clearlist') {
        
        msg.reply("sicuro di voler svuotare la lista? Ormai ho fatto xd");
    }
});