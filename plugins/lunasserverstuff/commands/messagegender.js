
exports.run = (client, message, args, level) => {
  const embed = {
    "color": 16075907,
        "fields": [
      {
        "name": "What gender are you?",
        "value": "Click on the Reactions below!"
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
  name: "gendermessage",
  category: "System",
  description: "Shows the Gender picker message",
  usage: "gendermessage"
};