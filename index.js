const commands = require("./commands.js");

const shoeDiscordBot = () => {
  commands.debug();
  commands.help();
  commands.nextDrop();
  commands.retail();
};

shoeDiscordBot();
