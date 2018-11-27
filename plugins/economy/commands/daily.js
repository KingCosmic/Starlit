const min = 20;
const max = 50;

//Get 1 day in milliseconds
const one_hour = 1000 * 60 * 60 * 1;

exports.run = (client, message, args) => {
  
  // TODO: check if its been 24 hours
  
  const last = client.userInfo.getProp(message.author.id, 'economy.daily');
  
  const now = new Date();
  
  // gotta check if they've never done daily before
  if (last) {
    
    const timePassed = Math.ceil((now.getTime() - last) / (one_hour));
    
    if (timePassed < 24) {
      return message.reply('It hasn\'t been a day since you used daily, please try again later');
    }
  }
  
  
  
  let coins = client.userInfo.getProp(message.author.id, 'economy.coins')
  
  let dailyAmount = Math.floor(Math.random() * (max - min + 1)) + min;
  
  coins += dailyAmount;
  
  client.userInfo.setProp(message.author.id, 'economy.coins', coins)
  client.userInfo.setProp(message.author.id, 'economy.daily', new Date().getTime())
  
  message.channel.send(`You got ${dailyAmount} of :yen: for a new total of ${coins} :yen:`)
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "daily",
  category: "economy",
  description: "get daily yen",
  usage: "daily"
};