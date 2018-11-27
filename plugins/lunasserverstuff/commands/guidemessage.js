
exports.run = (client, message, args, level) => {
  const embed = {
    "color": 16075907,
        "fields": [
      {
        "name": "This guide will tell you what every channel is for!\n\nReception",
        "value": "<#510416564382859264> the rules\n<#514412702429478933> assigning roles to yourself\n<#512383405384531968> new member notifications\n<#487327810843836437> all the server emojis\n<#467014131694960672> server announcements about new stuff\n<#475603443092815883> suggest new stuff for the server"      },
      {
        "name": "The Bar",
        "value": "<#483281473542291473> all the available purchasable roles\n<#478237091399204877> purchase roles from the shop"
      },
      {
        "name": "Ground Floor",
        "value": "<#460383419596275713> the general text chat\n<#466021837042876417> send images here if there\'s no channel for it\n<#504996795638743070> talk about manga and anime\n<#460436903586562058> use the bots\n<#469542435643719680> talk about games"      },
      {
        "name": "Second Floor",
        "value": "<#468533681800216586> send pictures of your pets\n<#468791997851762688> send your art here\n<#467824962418245652> roleplay with members\n<#465185359068790784> send the dankest memes"      },
      {
        "name": "Roof",
        "value": "<#487682268098330636> talk to people about your problems\n<#470682251966021634> send links to youtube videos etcetera\n<#468833393191157764> send pictures of yourself\n<#474604887301292042> self promote your social media\n<#466027449394659328> send funny moments in the server"      },
      {
        "name": "Over 18's",
        "value": "<#467804296176599040> send Hentai here"
      },
      {
        "name": "Main Hall",
        "value": "<#460449436871426048> control the music bots here\n**General Voice Channel** talk about anything over voice chat\n**Music With Voice** Talk to people while listening to music\n**Music Without Voice** Listen to music with others without interruptions\n**GameNight** when we do a server event to play games together"
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
  name: "guide",
  category: "System",
  description: "Shows the server guide message",
  usage: "guide"
};