const discordBotkit = require('botkit-discord');

const configuration = {
	token: 'NTE5OTg4NDEyMzA5MDQ1MjU0.DuoGDA.KGQltkmzDcpxTmm1leT37DRVXgs'
};

const discordBot = discordBotkit(configuration);

discordBot.hears('.*', 'mention', (bot, message) => {
	const responses = [
		"It is certain",
		"It is decidedly so",
		"Without a doubt",
		"Yes – definitely",
		"You may rely on it",
		"As I see it",
		"yes",
		"Most Likely",
		"Outlook good",
		"Yes",
		"Signs point to yes"
	];

	const randomIndex = Math.floor(Math.random() * responses.length);
	bot.reply(message, responses[randomIndex]);
});