module.exports = function(controller) {
  controller.hears(".*", "mention", (bot, message) => {
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
};
