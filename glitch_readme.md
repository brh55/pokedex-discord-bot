# Discord Magic 8 Ball on Glitch
This is 🔗[Discord Magic 8 Ball](https://github.com/brh55/discord-magic-8-ball), a Discord bot built with the 🔗[Botkit Discord Connecter](https://github.com/brh55/botkit-discord). 

The Botkit Discord Connector allows bot builders to get the best of both 🔗[discord.js](https://github.com/discordjs/discord.js) and 🔗[Botkit](https://botkit.ai/). 🔗[discord.js](https://github.com/discordjs/discord.js) is one of the most popular Node.js modules for interacting with the Discord api. 🔗[Botkit](https://botkit.ai/) is a popular framework for building bots. It has lots of great documentation and requires very little code to make complex bots.


## Discord Bots on Glitch
This app is a Discord Bot ported to Glitch. Here are some tips for using Discord Bots on Glitch:

### Creating a Discord App
### Adding your Discord secrets (tokens, etc.) to Glitch
Depending on your bot, you'll either use a token or API key to authenticate with 

### Adding your bot to a Discord Server
### Your bot will go to sleep
At Glitch, [projects will "go to sleep" after 5 minutes](https://glitch.com/help/restrictions/). A sleeping project is still here on the Glitch servers, it's just turned off. It will "awake" or turn back on when it receives an HTTP request. An example of an HTTP request is visiting your bots homepage. 

There are some Node modules that purport to keep your project awake for longer, but Glitch will still force your bot to sleep after 12 hours.

One option for keeping your bot awake with HTTP requests is Uptime Robot