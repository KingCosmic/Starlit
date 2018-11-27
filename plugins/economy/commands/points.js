
exports.run = (client, message, args) => {
  const key = message.author.id;

  message.channel.send(`You currently have ${client.userInfo.getProp(key, "economy.points")} points \n\nYou are currently level ${client.userInfo.getProp(key, "economy.level")}!`);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [''],
  permLevel: "User"
};

exports.help = {
  name: "points",
  category: "Miscelaneous",
  description: "Shows your points and levels.",
  usage: "points"
};