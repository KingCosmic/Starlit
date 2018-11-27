const embeds = require('../embeds'); 

exports.run = (client, message, args) => {
  const user = message.mentions.members.first();

  if (!user) {
    client.awaitReply(message, `Who do you want to ban? reply with \`cancel\` to cancel`)
    .then((resp) => {
      if (resp.content.toLowerCase() === 'cancel') return message.reply('Command canceled');

      const user = resp.mentions.members.first();
      if (!user) return message.reply('I didnt understand. command canceled');

      ban(message, user);
    })
  } else {
    ban(message, user);
  }
}

const ban = (message, user) => {
  user.send({ embed: embeds.dm(message.member) })
  .then(() => {
    user.ban()
    .then(() => {
      message.channel.send({ embed: embeds.confirmation(message.member, user) });
    })
    .catch(() => {
      message.channel.send({ embed: embeds.error(user) });
    })
  })
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['b'],
  permLevel: 'Mod'
};

exports.help = {
  name: "ban",
  category: "Moderation",
  description: "Bans user",
  usage: "ban @user reason"
};