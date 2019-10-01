const textToSpeech = require('@google-cloud/text-to-speech');
const path = require('path');
const fs = require('fs');
const util = require('util');

const writeFile = util.promisify(fs.writeFile);
const accessFile = util.promisify(fs.access);
module.exports = {
	synthesize: async (pokemon) => {
		const file = path.join(__dirname, '..', 'assets', `${pokemon.name}.mp3`);

		// Null indicates file exists, so we evaluate and return negation
		const fileExists = !(await accessFile(file));
		if (fileExists) {
			console.log('file already exists, just return absolute location');
			return file;
		}

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
		await writeFile(file, response.audioContent, 'binary');
		console.log('Audio content written to file:', file);
		return file;
	}
}
