
const kisslinks = [
  'https://cdn.discordapp.com/attachments/471600179662028802/473246641680547850/3wih.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/473246647028023296/9eb25ac0104529e1323f691e3a765f3f.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/473246648613470209/82d0a4d1ac4602c028e576fb6c1f7e2cbdde92f2_hq.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/473246656238845992/560bb37b1596f48d93a76db4f87dc2f9.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/473246666837983252/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/473246672822992897/dvDUkE9.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/473246674589057034/tumblr_n0bq842biQ1rjwa86o1_500.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/473246688602095616/tumblr_n4go91rApi1sfqkpto1_500.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/473246702367801345/tumblr_nynnjpPufu1syeyvqo3_500.gif'
];

exports.run = (client, message, args) => {
  const kissed = message.mentions.members.first();
  const kisser = message.member;

  const kissCount = client.userInfo.getProp(kisser.id, 'weirdactions.kisses') || {};

  if (!kissed) {
    client.awaitReply(message, 'who do you want to kiss? reply `cancel` to cancel the command.', 10000)
    .then((resp) => {
      if (resp.content.toLowerCase() === 'cancel') return message.reply('command canceled');
      
      const kissie = resp.mentions.members.first();
      if (!kissie) return message.reply('failed to understand, command canceled');
      kiss(client, kisser, kissed, kissCount, message);
    })
    .catch(() => {
      message.reply('command canceled');
    })
  } else {
    kiss(client, kisser, kissed, kissCount, message);
  }  
}

const kiss = (client, kisser, kissed, kissCount, message) => {
  (kissCount[kissed.id]) ? kissCount[kissed.id]++ : kissCount[kissed.id] = 1;

  client.userInfo.setProp(kisser.id, 'weirdactions.kisses', kissCount);

  const embed = {
    "title": `${kisser.displayName} kisses ${kissed.displayName}`,
    "color": 12648579,
    "timestamp": new Date().toISOString(),
    "footer": {
      "text": (kissCount[kissed.id] === 1) ? "first kiss from you <3" : `That's ${kissCount[kissed.id]} kisses now`
    },
    "image": {
      "url": kisslinks[Math.floor(Math.random() * kisslinks.length)]
    }
  };

  message.channel.send({ embed });
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "kiss",
  category: "Miscelaneous",
  description: "kisses someone",
  usage: "kiss @someone"
};