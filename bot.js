const discordBotkit = require('botkit-discord');

const configuration = {
	token: 'TOKEN_HERE'
};

const discordBot = discordBotkit(configuration);
const normalizedPath = require("path").join(__dirname, "skills");

require("fs").readdirSync(normalizedPath).forEach(function(file) {
	require("./skills/" + file)(discordBot);
});

module.exports = discordBot;
