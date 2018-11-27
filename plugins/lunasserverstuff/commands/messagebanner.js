
exports.run = (client, message, args, level) => {
  const embed = {
    "color": 16075907,
        "fields": {
      },
      "image": {
        "url": "https://cdn.discordapp.com/attachments/472130065845714974/515149112283365377/NatCafeBanner.png"
      }
  };
  
  message.channel.send({
   embed
  });
};

// this defines if the command is enabled, only usable in guilds, aliases it might
// have and the permission level required to run it
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Admin"
};

// this defines things for use in the help command.
exports.help = {
  name: "banner",
  category: "System",
  description: "Shows the server banner",
  usage: "banner"
};