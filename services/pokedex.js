const Pokedex = require('pokedex-promise-v2'); // Import the SDK
const api = new Pokedex(); // Construct API

module.exports = {
	search: target => {
        // Promise.all to perform both API calls
        // This returns the results in an array
		return Promise.all([
			api.getPokemonByName(target),
			api.getPokemonSpeciesByName(target)
		])
        .then(results => {
            const nameResult = results[0]
            const speciesResult = results[1];

			// Filter for english descriptions
            const enDescriptions = speciesResult.flavor_text_entries.filter(flavor => flavor.language.name === 'en')
            // Use the first entry
            const description = enDescriptions[0].flavor_text;

            // Destructure the first set of results
            // and add a new description field from the
            // flavor text entries.
            return {
                ...nameResult,
                description
            }
        });
	}
}
