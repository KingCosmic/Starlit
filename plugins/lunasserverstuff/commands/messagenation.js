
exports.run = (client, message, args, level) => {
  const embed = {
    "color": 16075907,
        "fields": [
      {
        "name": "What nationality are you?",
        "value": ":regional_indicator_n:= North America\n:regional_indicator_s:= South America\n:regional_indicator_e:= Europe\n:regional_indicator_a:= Asia\n:a:= Africa\n:regional_indicator_o:= Oceania"
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
  name: "nationalitymessage",
  category: "System",
  description: "Shows the pingable roles picker message",
  usage: "nationalitymessage"
};