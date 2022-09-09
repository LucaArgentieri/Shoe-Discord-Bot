const prefix = "$";

const checkPrefix = (msg, command) => {
    return msg.content === `${prefix}${command}`;
};

const errorMsg = (msg, text) => {
    msg.author.send(text);
};

module.exports = {
    errorMsg,
    checkPrefix
}

