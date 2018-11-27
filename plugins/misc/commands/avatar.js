
module.exports.run = (client, message, args) => {
  let target = message.mentions.users.first() || message.author;

  message.channel.send({
    files: [
      {
        attachment: target.displayAvatarURL,
        name: "avatar"
      }
    ]
  });
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "avatar",
  category: "Miscelaneous",
  description: "Shows your profile picture",
  usage: "avatar"
};