
const bitelinks = [
  "https://cdn.discordapp.com/attachments/472130065845714974/490636046996996096/tenor.gif",
  "https://cdn.discordapp.com/attachments/472130065845714974/490639147577507840/giphy_1.gif"
]

exports.run = (client, message, args) => {
  const bit = message.mentions.members.first();
  const bite = message.member;

  const biteCount = client.userInfo.getProp(bit.id, 'weirdactions.bites') || {};
  
  if (!bit) {
    client.awaitReply(message, 'who do you want to bite? reply `cancel` to cancel the command.', 10000)
    .then((resp) => {
      if (resp.content.toLowerCase() === 'cancel') return message.reply('command canceled');
      
      const bit = resp.mentions.members.first();
      if (!bit) return message.reply('failed to understand, command canceled');
      BITE(client, bit, bite, biteCount, message);
    })
    .catch(() => {
      return message.reply('ran out of time command canceled');
    })
  } else {
    BITE(client, bit, bite, biteCount, message);
  }

}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "bite",
  category: "Miscelaneous",
  description: "bites someone",
  usage: "bite @someone"
};

const BITE = (client, bite, bitter, biteCount, message) => {
  (biteCount[bitter.id]) ? biteCount[bitter.id]++ : biteCount[bitter.id] = 1;

  client.userInfo.setProp(bite.id, 'weirdactions.bites', biteCount);

  const embed = {
    "title": `${bitter.displayName} bites ${bite.displayName}`,
    "color": 12648579,
    "timestamp": new Date().toISOString(),
    "footer": {
      "text": (biteCount[bitter.id] === 1) ? "first bite from you :3" : `That's ${biteCount[bitter.id]} bites now`
    },
    "image": {
      "url": bitelinks.random()
    }
  };

  message.channel.send({ embed });
}