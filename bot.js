const discordBotkit = require('botkit-discord');

const configuration = {
	token: "NTE5OTg4NDEyMzA5MDQ1MjU0.XYO5pw._HTV7ShbKUslSy3Zsiio4W0eDCg"
};

const discordBot = discordBotkit(configuration);
const normalizedPath = require("path").join(__dirname, "skills");

require("fs").readdirSync(normalizedPath).forEach(function(file) {
	require("./skills/" + file)(discordBot);
});

module.exports = discordBot;
