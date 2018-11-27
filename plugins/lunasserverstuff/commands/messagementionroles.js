
exports.run = (client, message, args, level) => {
  const embed = {
    "color": 16075907,
        "fields": [
      {
        "name": "These roles are mentionable, click on the ones you want",
        "value": "Please note that these mentionable roles might be used maliciously by raiders so please keep that in mind\n\nGaming (:video_game:): Equip this role to be pinged when people want to play video games and need someone to play with or want a recommendation of what to play! <#469542435643719680>\n\nHelper (:thought_balloon:): Equip this role to be pinged when someone needs advice or someone to vent/talk to. <#487682268098330636>\n\nAnime (:yen:): Equip this role to be pinged when new anime and episodes come out or when you or someone wants a recommendation of what to watch! <#504996795638743070>"
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
  name: "pingrolesmessage",
  category: "System",
  description: "Shows the pingable roles picker message",
  usage: "pingrolesmessage"
};