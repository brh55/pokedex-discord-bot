module.exports = function(controller) {
  controller.hears(['^thanks (.*)','^thanks'], "mention", (bot, message) => {
    let userID = message.userID;
    let response = "Kudos from <@" + userID + ">";
    console.log(message);

    bot.reply(message, response);
  });
};
