module.exports = function(controller) {
  controller.hears("!thanks", ["direct_mention", "mention"], (bot, message) => {
    let userID = message.userID;
    let response = "Kudos from <@" + userID + "> 🎉";
    console.log(message);

    bot.reply(message, response);
    console.log(response)
  });
};