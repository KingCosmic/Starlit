

exports.run = (client, message, args, level) => {
  const reciever = message.mentions.users.first();

  if (!reciever) return message.reply('you have to tag someone to give coins to');

  // remove the user mention
  args.shift();

  if (args.length === 0) return message.reply('you need to specify how much to give them');

  const amountToGive = Number(args[0]);

  let myCurrency = client.userInfo.getProp(message.author.id, 'economy.coins');

  if (myCurrency < amountToGive) return message.reply(`you can't give ${amountToGive} when you only have ${myCurrency}`);

  let theirCurrency = client.userInfo.getProp(reciever.id, 'economy.coins');

  // get our new balances
  const remainingCoins = myCurrency - amountToGive;
  const newBalance = theirCurrency + amountToGive;

  client.userInfo.setProp(message.author.id, 'economy.coins', remainingCoins);
  client.userInfo.setProp(reciever.id, 'economy.coins', newBalance);

  message.reply(`your new balance of :yen: is ${remainingCoins}\nTheir new balance of :yen: is ${newBalance}`);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "give",
  category: "Miscelaneous",
  description: "gives currency to someone",
  usage: "give @someone 500"
};