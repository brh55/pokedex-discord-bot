module.exports = function(controller) {
  controller.hears("!thanks", ["direct_mention", "mention"], (bot, message) => {
    let response;
    let sender = message.user.toString();
    let recipient = message.mentions.users.first();
    
    let responses = [
      `${recipient} got kudos from ${sender} 🎉`,
      `${sender} thinks ${recipient} is awesome! ✨`,
      `Hey ${recipient}! ${sender} appreciates you! 😍`,
      `Hey ${recipient}! ${sender} thinks you rule! 💪`
    ]

    response = responses[Math.floor(Math.random() * responses.length)];
    
    bot.reply(message, response);
  });
}; 
