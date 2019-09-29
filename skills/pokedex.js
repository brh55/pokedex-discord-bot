const Pokedex = require('../services/pokedex');
const Speech = require('../services/speech');
const util = require('util');
const convert = require('convert-units');
process.on("unhandledRejection", console.error);

// Add this helper method
const parseParameter = (command, text) => {
	const start = text.indexOf(command);
	const textStart = text.substring(start)
	const parameters = textStart.split(" ");

	if (parameters[1]) {
		return parameters[1];
	}
	return null;
}

// Return <feet>' <inches>"
const formatHeight = (height) => {
	// height is in decimeter
    const meters = height / 10;
    const feet = convert(meters).from('m').to('ft-us');
    const parts = feet.toString().split('.');
    const characteristic = parts[0];
    const mantissa = `.${parts[1]}`;
    const inches = convert(mantissa).from('ft').to('in').toFixed();
    return `${characteristic}' ${inches}"`
}

// Return <lb> lbs
const formatWeight = (weight) => {
    // weight is in hectograms
    const grams = weight * 100;
    // Pokedex usually shows up to the tenth
    const lb = convert(grams).from('g').to('lb').toFixed(1);
    return `${lb} lbs`;
}

// Return "name" -> "Name"
const formatName = (name) => name.charAt(0).toUpperCase() + name.slice(1);

module.exports = controller => {
	const POKEDEX_CMD = '!pokedex';

	controller.hears(
		POKEDEX_CMD, // this is our command
		// We define the context of when our bot should hear this command
		// ambient = all of chat the bot is in
		// direct_message = any messages directly sent to the bot
		['ambient', 'direct_message'],
        async (bot, message) => {
            const parameter = parseParameter(POKEDEX_CMD, message.text);

            if (parameter) {
				try {
					const result = await Pokedex.search(parameter)
					const embed = new controller.RichEmbed();
					embed.setAuthor(
						"Pokedex",
						"https://icon-library.net/images/pokedex-icon/pokedex-icon-15.jpg" // Grabbing this icon from icon-library
					);
					embed.setTitle(formatName(result.name));
					embed.setDescription(`**No. ${result.id}** \n **${result.types[0].type.name}**`);
					embed.setThumbnail(result.sprites.front_default);
					embed.addField("Weight", formatWeight(result.weight));
					embed.addField("Height", formatHeight(result.height));
					embed.setColor("GREEN");
					embed.addField("Description", result.description);

					if (bot.api.joinVoiceChannel) {
						const voiceFile = await Speech.synthesize(result);
						const connection = await bot.api.joinVoiceChannel();
						const dispatcher = connection.playFile(voiceFile);

						dispatcher.setVolume(0.5);
						dispatcher.on('end', () => {
							bot.api.leaveVoiceChannel();
							dispatcher.destroy();
						});
					}

					bot.reply(message, embed);
				} catch(err) {
					console.log(err);
					bot.reply(message, 'NO DATA')
				}
            } else {
                bot.reply(message, 'Please try again with a name or number');
            }
		}
	)
}
