const help = require('./commands/help');
const nextDrop = require('./commands/nextDrop');
const infoShoesNumber = require('./commands/infoShoesNumber');
const monthDrop = require('./commands/monthDrop');
const mostPopular = require('./commands/mostPopular');
const retail = require('./commands/retail');
const todayDrop = require('./commands/todayDrop');

const shoeDiscordBot = () => {
  help();
  infoShoesNumber()
  monthDrop();
  mostPopular();
  nextDrop();
  retail();
  todayDrop();
};

shoeDiscordBot();
