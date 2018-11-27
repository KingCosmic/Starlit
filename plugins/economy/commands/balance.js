
exports.run = async (client, message, args, level) => {
  const currency = client.userInfo.getProp(message.author.id, 'economy.coins');
  message.reply(`your current amount of :yen: is ${currency}`);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['bal'],
  permLevel: "User"
};

exports.help = {
  name: "balance",
  category: "Miscelaneous",
  description: "shows your current balance",
  usage: "balance"
};