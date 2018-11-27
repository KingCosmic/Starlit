
exports.run = (client, message, args, level) => {
  const embed = {
    "color": 16075907,
        "fields": [
      {
        "name": "Equip roles",
        "value": "These roles are optional except the last one, please only equip one from each set except the mentionable roles, equipping multiple will result in a warning and a channel block!"
      },
    ]
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
  name: "messagewarningroles",
  category: "System",
  description: "Shows the warning role message",
  usage: "messagewarningroles"
};