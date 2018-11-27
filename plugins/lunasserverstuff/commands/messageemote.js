
exports.run = (client, message, args, level) => {
  const embed = {
  "color": 16075907,
  "timestamp": "2018-08-26T00:15:51.318Z",
  "fields": [
    {
      "name": "Natsuki's Café Emojis",
      "value": "These are all the emojis in the server!"
    },
    {
      "name": "Emojis (Page 1/7)",
      "value": "<:natsukiyay:512236625993138178> ``:natsukiyay:``\n<:natsukiwtf:512236627071074314> ``:natsukiwtf:``\n<:natsukiwink:512236626907234325> ``:natsukiwink:``\n<:natsukiwhoa:512236624642572288> ``:natsukiwoah:``\n<:natsukiwhat:512236626328682506> ``:natsukiwhat:``\n<:natsukiwhaa:512236626299322378> ``:natsukiwhaa:``\n<:natsukiultrablush:512236626525683724> ``:natsukiultrablush:``\n<:natsukithonk:512236624223141919> ``:natsukithonk:``\n<:natsukithink:512236623413379081> ``:natsukithink:``\n<:natsukisweat:512236629122088970> ``:natsukisweat:``"
    },
    {
      "name": "Emojis (Page 2/7)",
      "value": "<:natsukismug:512236622981496832> ``:natsukismug:``\n<:natsukismile:512236626034950165> ``:natsukismile:``\n<:natsukishocked:512236624311222272> ``:natsukishocked:``\n<:natsukisad:512236623853781012> ``:natsukisad:``\n<a:natsukirainbow:512236679848001547> ``:natsukirainbow:``\n<:natsukiqt:512236625770577940> ``:natsukiqt:``\n<:natsukipukerainbows:512236624877453313> ``:natsukipukerainbows:``\n<:natsukipuke:512236623417835540> ``:natsukipuke:``\n<:natsukiping:512236623274967051> ``:natsukiping:``\n<a:natsukimadani:512236678199377921> ``:natsukimadani:``"
    },
    {
      "name": "Emojis (Page 3/7)",
      "value": "<:natsukimad:512236623451258891> ``:natsukimad:``\n<:natsukilurk:512236623690203136> ``:natsukilurk:``\n<:natsukihug:512236623056863248> ``:natsukihug:``\n<:natsukihmph:512236625648943124> ``:natsukihmph:``\n<:natsukiheh:512236623165915157> ``:natsukiheh:``\n<:natsukiheadpat:512236623266709504> ``:natsukiheadpat:``\n<:natsukihappyneko:512236628379566083> ``:natsukihappyneko:``\n<:natsukihappy:512236623245869077> ``:natsukihappy:``\n<:natsukihaha:512236625380638731> ``:natsukihaha:``\n<:natsukigun:512236625082712066> ``:natsukigun:``"
    },
    {
      "name": "Emojis (Page 4/7)",
      "value": "<a:natsukidancecrazyani:512236678522470421> ``:natsukidancecrazyani:``\n<a:natsukidanceani:512236678434390018> ``:natsukidanceani:``\n<a:natsukidance3:512236678283395082> ``:natsukidance3:``\n<a:natsukidance2crazy:512236678325469184> ``:natsukidance2crazy:``\n<a:natsukidance2ani:512236678241452033> ``:natsukidance2ani:``\n<:natsukidance:512236621211369494> ``:natsukidance:``\n<a:natsukidabcrazyani:512236678119686164> ``:natsukidabcrazyani:``\n<a:natsukidabani:512236677876547599> ``:natsukidabani:``\n<:natsukicry:512236625070391296> ``:natsukicry:``\n<a:natsukicrazyani:512236675980591104> ``:natsukicrazyani:``"
    },
    {
      "name": "Emojis (Page 5/7)",
      "value": "<:natsukicool:512236623443001344> ``:natsukicool:``\n<:natsukicomfysleeping:512708833454456832> ``:natsukicomfysleeping:``\n<:natsukicomfy:512236630073933834> ``:natsukicomfy:``\n<:natsukichibizoomed:512236621165494272> ``:natsukichibizoomed:``\n<a:natsukichibispin:512236678757482508> ``:natsukichibispin:``\n<:natsukichibi:512236621274284072> ``:natsukichibi:``\n<:natsukiblush:512236623296200704> ``:natsukiblush:``\n<:natsukibarf:512236623790997524> ``:natsukibarf:``\n<:natsukibaakaneko:512236623165915156> ``:natsukibaakaneko:``\n<:natsukibaaka:512236621874200577> ``:natsukibaaka:``"  
    },
    {
      "name": "Emojis (Page 6/7)",
      "value": "<:natsukiangry:512236621492649994> ``:natsukiangry:``\n<:cupcake:512241096689057792> ``:cupcake:``\n<:natsukibanhammer:512282127124004864> ``:natsukibanhammer:``\n<:natsukiwaa:512334733267566593> ``:natsukiwaa:``\n<:natsukilenny:512339671641096192> ``:natsukilenny:``\n<:natsukifu:512334733171228682> ``:natsukifu:``\n<:natsukipogchamp:512615527613595649> ``:natsukipogchamp:``\n<:natsuawoo:515655023301099530> ``:natsuawoo:``\n<:natsuki2B:515655020348309505> ``:natsuki2B:``\n<:natsukisexy:515655020167954442> ``:natsukisexy:``"
    },
    {
      "name": "Emojis (Page 7/7)",
      "value": "<:natsukiderp:515655019568037909> ``:natsukiderp:``"
    }
   ]
};
  
  message.channel.send({
    embed
  })
}

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
  name: "emote",
  category: "System",
  description: "Displays all the server emotes",
  usage: "emote"
};