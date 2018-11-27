const items = require('../items');

exports.run = (client, message, args) => {
  // combine args with a space between ['Anime', 'Lover'] becomes 'Anime Lover'
  const itemName = args.join(' ');
  
  if (!items[itemName]) return message.reply('That item doesn\'t exist!\nMaybe this will help:\n-Check Caps\n-Don\'t use @ (If it was a mentionable role then you\'ve pinged everyone with that role)');
  
  const itemToPurchase = Object.assign({}, items[itemName]);
  
  buyItem(client, message, message.author, itemToPurchase);
}

const buyItem = (client, message, user, item) => {
  let yen = client.userInfo.getProp(user.id, 'economy.coins');

  if (yen < item.price) return message.reply(`You don\'t have enough to purchase ${item.name}!`);
  
  const remainingBalance = yen - item.price;
  
  client.userInfo.setProp(user.id, 'economy.coins', remainingBalance);
  
  item.purchase(client, message.member);
  message.channel.send(`Thank you for your purchase, your remaining balance is ${remainingBalance} <:cupcake:512241096689057792>!`);
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['buy'],
  permLevel: "User"
};

exports.help = {
  name: "purchase",
  category: "economy",
  description: "purchases a item from the shop",
  usage: "purchase/buy [itemName]"
};