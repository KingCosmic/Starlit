
exports.run = (client, message, args, level) => {
  const embed = {
    "color": 16075907,
        "fields": [
      {
        "name": "What's your age?",
        "value": ":baby_bottle:= 13-14\n:baby:= 15-16\n:boy:= 17-18\n:man:= 19-25\n:man_in_tuxedo:= 26-29\n:older_man:= 30+"
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
  name: "agemessage",
  category: "System",
  description: "Shows the age picker message",
  usage: "agemessage"
};