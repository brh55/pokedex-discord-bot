const discordBotkit = require('botkit-discord');

const configuration = {
	token: process.ENV.DISCORD_TOKEN
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


discordBot.hears('hello world', direct_message, (bot, message) => {
    // ! Do not forget to pass along the message as the first parameters
    bot.reply(message, 'testing');
});