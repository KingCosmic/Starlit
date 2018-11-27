
exports.run = (client, message, args, level) => {
  const embed = {
  "color": 16075907,
  "fields": [
    {
    "name": "Rules:",
    "value": "[We use a three warning system, three warnings and you're out!]\n\n1. No Loli/Shota, Bestiality, Gore/Vore or Rape in NSFW channels, all NSFW content must go in NSFW channels! [Breaking this rule will result in a perma ban]\n\n2. Only use bots in Bot Channels (<#460436903586562058>) [Warning]\n\n3. No racist, homophobic, sexist language/phrases or any type of harassment, if a member is harassing you in the server or DM's then please tell a staff member, you can swear but not excessively or directed at anyone [Warning and a mute if you continue]\n\n4. No spamming, this means sending messages quickly and mentioning people or roles excessively [This will be an perma ban]\n\n5. Do not send links in any channel but <#470682251966021634>\n\n6. Please do not advertise any where but <#474604887301292042>, you must ask an Admin to post it to avoid spam\n\n7. Offensive Names and nsfw pfp's are not allowed [Insta Kick]\n\nIf you want access to the rest of the server then check out <#514412702429478933>"
    },
 ]
};
  message.channel.send({
    embed
  })
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Admin"
};
exports.help = {
  name: "serverinfo",
  category: "System",
  description: "shows the server information",
  usage: "serverinfo"
};