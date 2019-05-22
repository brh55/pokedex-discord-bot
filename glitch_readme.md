

## Discord Bots on Glitch
This app is a Discord Bot ported to Glitch. Here are some tips for using Discord Bots on Glitch:

### Code tips:
1. Check out the logs since your code will log messages about its status there. It's also useful for figuring stuff out. Curious about a variable like `bot`? Console log it with `console.log(bot)` and info will appear in the logs.
2. Some files like `package.json` and `.env` react badly to extra spaces and special characters. If you get a weird error, check those files since sometimes extra spaces get added by pasting.


### Creating a Discord App
### Adding your Discord secrets (tokens, etc.) to Glitch
Discord will generate a token for your bot. Treat this like a password, which means keep it secret. To help with that, we have an `.env` file. You can all secrets there as variables. Let's say you have a Discord token that's `NTY4NjI5NDk3ODYferhewruihewruiweRE23`. You can add `DISCORD_TOKEN=NTY4NjI5NDk3ODYferhewruihewruiweRE23` to `.env`. Now instead of using the token in your code, whenever the token is needed you can use `process.env.DISCORD_TOKEN`. 

`.env` is not viewable by anyone but members of the project. If others view the code or copy it (this is called ["remixing"](https://glitch.com/help/remix/) on Glitch. 

You can learn more about `.env` at [our help center](https://glitch.com/help/env/).

### Keeping your bot secure
Here are some important tips for keeping your Discord bot secure:
- Anyone can view and copy your bot code **unless** you make your project private. Here's [how to do that](https://glitch.com/help/privateproject/).
- Want to work with others? [You can add collaborators](https://glitch.com/help/how-do-i-invite-collaborators-to-edit-my-project/). But be careful since collaborators can see your secrets in `.env` and create copies of your project. 

If you believe your Discord token has been compromised, you can reset it in the Discord app portal. 

### Adding your bot to a Discord Server

### Your bot will go to sleep
At Glitch, [projects will "go to sleep" after 5 minutes](https://glitch.com/help/restrictions/). A sleeping project is still here on the Glitch servers, it's just turned off. It will "awake" or turn back on when it receives an HTTP request. An example of an HTTP request is visiting your bots homepage. 

There are some Node modules that purport to keep your project awake for longer, but Glitch will still force your bot to sleep after 12 hours.

One option for keeping your bot awake with HTTP requests is Uptime Robot

### Where's my storage?
If you notice in the logs there's the message `info: ** No persistent storage method specified! Data may be lost when process shuts down.`. That means that bot can't save anything. If you want to save things like the number of points a user has, you'll need storage. 

There are many options for this on Glitch. SQLITE and flat file databases are popular options, but some caveats to remember are: 
- if you edit the database in the Glitch editor it may become corrupted
- if you put it in `.data` it is not backed up the same way the other code is, it can be recovered by support but it can take us time
- flat file databases (like those that use .json files) often don't handle multiple people querying it well and become corrupted.

An option that has none of those downsides is Firebase. And Firebase has a [Botkit connector](https://github.com/howdyai/botkit-storage-firebase). 