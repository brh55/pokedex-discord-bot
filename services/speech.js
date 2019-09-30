const textToSpeech = require('@google-cloud/text-to-speech');
const path = require('path');
const fs = require('fs');
const util = require('util');

module.exports = {
	synthesize: async (pokemon, text) => {
		const client = new textToSpeech.TextToSpeechClient();
		const speechText = `${pokemon.name}, the ${pokemon.types[0].type.name}} Pokemon, ${pokemon.description}`;

		// Construct the request
		const request = {
			input: {
				text: speechText
			},
			voice: {
				languageCode: 'en-US',
				ssmlGender: 'NEUTRAL'
			},
			audioConfig: {
				audioEncoding: 'MP3'
			},
		};

		const [response] = await client.synthesizeSpeech(request);
		const file = path.join(__dirname, '..', 'assets', `${pokemon.name}.mp3`);
		const writeFile = util.promisify(fs.writeFile);
		await writeFile(file, response.audioContent, 'binary');
		console.log('Audio content written to file:', file);
		return file;
	}
}
