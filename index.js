require('dotenv').config();
const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require('fs');
bot.login(process.env.DISCORD_KEY);
//fz link
const a = {
    link:[]
}; 

bot.on('message', (msg) => {        //Presentati
    if (msg.content == '!presentati') {
        msg.channel.send('AO mo che so qui te aggiorno sulle paia, basta che me lo chiedi, scrivi !help per conoscere piu comandi *wink wink* :wink::wink::wink:  ');
    }
});
bot.on('message', (msg) => {        //Help
    if (msg.content == '!help') {
        msg.channel.send('Ciao i comandi disponibili per questo bot sono: \n !presentati - non lo sappiamo nemmeno noi, provalo.');
    }
});
bot.on('message', (msg) => {        //add Raffle links      
    if (msg.content.substr(0, 9) === "!addlinks") {
        const x = msg.content.substr(10, msg.length);
        console.log(a.link);
        a.link.push(x)
        let data = JSON.stringify(a);
        fs.writeFileSync('JsonList.json', data);
        msg.reply("Link aggiunto con successo");
    }
});
console.log(a);




bot.on('message', (msg) => {        //Elenco lista Raffle
    if (msg.content == '!Raffle') {
        msg.reply(lista);
    }
});
bot.on('message', (message) => {  //chat
    console.log(`[${message.author.tag}]: ${message.content}`)
});
