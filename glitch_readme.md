# Discord Magic 8 Ball on Glitch
This is 🔗[Discord Magic 8 Ball](https://github.com/brh55/discord-magic-8-ball), a Discord bot built with the 🔗[Botkit Discord Connecter](https://github.com/brh55/botkit-discord). 

The Botkit Discord Connector allows bot builders to get the best of both 🔗[discord.js](https://github.com/discordjs/discord.js) and 🔗[Botkit](https://botkit.ai/). 🔗[discord.js](https://github.com/discordjs/discord.js) is one of the most popular Node.js modules for interacting with the Discord api. 🔗[Botkit](https://botkit.ai/) is a popular framework for building bots. It has lots of great documentation and requires very little code to make complex bots.


## Discord Bots on Glitch
This app is a Discord Bot ported to Glitch. Here are some tips for using Discord Bots on Glitch:

### Creating a Discord App
### Adding your Discord secrets (tokens, etc.) to Glitch
Discord will generate a token for your bot. Treat this like a password, which means keep it secret. To help with that, we have an `.env` file. You can all secrets there as variables. Let's say you have a Discord token that's `NTY4NjI5NDk3ODYferhewruihewruiweRE23`. You can add `DISCORD_TOKEN=NTY4NjI5NDk3ODYferhewruihewruiweRE23` to `.env`. Now instead of using the token in your code, whenever the token is needed you can use `process.env.DISCORD_TOKEN`. 

`.env` is not viewable by anyone but members of the project. If others view the code or copy it (this is called ["remixing"](https://glitch.com/help/remix/) on Glitch. 

You can learn more about `.env` at [our help center](https://glitch.com/help/env/).

### Keeping your bot secure
Here are some important tips for keeping your Discord bot secure:
- Anyone can view and copy your bot code **unless** you make your project private. Here's [how to do that](https://glitch.com/help/privateproject/).
- Want to work with others? [You can add collaborators](https://glitch.com/help/how-do-i-invite-collaborators-to-edit-my-project/). But be careful since collaborators can see your secrets in `.env`. 
- You can ask for help from the community with the ["raised your hand"](https://glitch.com/help/how-can-i-get-help-with-code-in-my-project/) feature, but " Under some circumstances a malicious "helper" could gain access to your project's secret information in a way that would be easy to miss.


If you believe your Discord token has been compromised, you can reset it in the Discord app portal. 

### Adding your bot to a Discord Server

### Your bot will go to sleep
At Glitch, [projects will "go to sleep" after 5 minutes](https://glitch.com/help/restrictions/). A sleeping project is still here on the Glitch servers, it's just turned off. It will "awake" or turn back on when it receives an HTTP request. An example of an HTTP request is visiting your bots homepage. 

There are some Node modules that purport to keep your project awake for longer, but Glitch will still force your bot to sleep after 12 hours.

One option for keeping your bot awake with HTTP requests is Uptime Robot

### Where's my storage?

