
exports.run = (client, message, args, level) => {
  const embed = {
    "color": 16075907,
        "fields": [
      {
        "name": "This is required to see the rest of the server",
        "value": "Please press the below reaction to gain access to the other channels"
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
  name: "messagecupcakerole",
  category: "System",
  description: "Shows the cupcake role message",
  usage: "messagecupcakerole"
};