# Shoe Discord Bot 🤖👟
![Cattura](https://user-images.githubusercontent.com/57524787/189426406-07847a3e-2e7a-4085-8f75-e299146eab81.PNG)

## Idea 💡

We had in mind to build a bot to stay updated on the prices and upcoming releases of the sneakers.
The biggest problem was finding the right API, but we managed to find a guy who did a huge job, put together: StockX FlightClub, Goat and Stadium Goods API, cool right?

With this mega api we started studying discord.js and the project started.

## API 👟

[Sneaks-API](https://github.com/druv5319/Sneaks-API) by [@druv5319](https://github.com/druv5319)

A StockX API, FlightClub API, Goat API, and Stadium Goods API all in one.

Sneaks API is a sneaker API built using Node.JS, Express, and Got. The Sneaks API allows users to get essential sneaker content such as images, product links and even prices from resell sites while also collecting data and storing it within a database.
[Read more...](https://github.com/druv5319/Sneaks-API)

## Setup 📦

#### First create an application from [here](https://discord.com/developers/applications)
- Go in Bot and create a new bot
- Go in 0Auth2/General
- Select in AUTHORIZATION METHOD In-App Authorization
- Tick bot in SCOPES
- Tick administrator in BOT PERMISSIONS 
- Copy CLIENT ID

#### Now move in Bot tab and tick
- Presence Intent
- Server Members Intent
- Message Content Intent

![Bot message content intent](https://user-images.githubusercontent.com/57524787/190902625-7265b502-bfa4-43ac-a949-f59a3fec7369.PNG)



#### Invite the bot in your discord server with this link template: https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&scope=bot

#### Clone the repo

```
git clone https://github.com/LucaArgentieri/Shoe-Discord-Bot.git
```

#### Run

```
npm i
```

#### Create a .env file and put bot token (you can copy it from dev portal -> bot -> token)

```
BOT_TOKEN_KEY=DISCORD_BOT_TOKEN_HERE
```

#### Run

```
npm run start
```

#### Use commands in chat! 🎉

##### You can use heroku or others for host your bot and have fun

## Commands 🤖

#### Some names are temporary

**$help**
For information on generic resell prices or based on the desired number.

**$retail Yeezy**(example)
To get information about a shoe at retail.

**$nextDrop**
To stay updated on upcoming releases.

**$todayDrop**
To stay updated on the releases of the day.

**$monthDrop**
To stay updated on the releases of the current month.

**$infoShoesNumber Yeezy 11**(example)
To get information about a shoe with number.

**$mostPopular**
To see the most popular scapre in the last three months.

---
#### Thanks to all [Contributors](https://github.com/LucaArgentieri/Shoe-Discord-Bot/graphs/contributors) 👩‍💻👨‍💻

#### If you like star ⭐️ and share!
