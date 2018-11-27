
const patlinks = [
  'https://cdn.discordapp.com/attachments/471600179662028802/478937108833239043/ea1ee48443a70c648858957aaebd1ecc86f82c33_hq.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/478937109801992207/Petting_Renge.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/478937110871801856/tumblr_n7t4ioLycK1rbnx7io1_500.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/478937129418883082/1470269762425.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/478937129850765315/42VnOL9.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/478937130350149647/tumblr_n4rqmsZiZO1qbvovho1_500.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/478937145344655360/head-pat-gif-10.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/478937145810092032/original.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/478937145810092033/MassiveNeglectedAustraliankestrel-small.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/478937170476793856/Jxpz.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/478937171290750986/039ai6r52j301.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/478937171802324992/tenor_3.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/478937223535001602/68c1b61a30b4eccb033c4a47895c7be0.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/478937224302428183/Headpatreactionsomethingsimpleandcuteiguess_6d8a65_6488624.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/478937251871719424/anime-head-pat-gif-11.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/478937252362321920/anime-head-pat-gif-9.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/478937252794204170/FantasticEmptyBluewhale-small.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/478937364727595019/giphy.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/478937365705129994/tenor_1.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/478937366862495757/ImpurePleasantArthropods-small.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/478937367336714240/WyMHuyL.gif'
];

exports.run = (client, message, args) => {
  const patted = message.mentions.members.first();
  const patter = message.member;

  const patCount = client.userInfo.getProp(patter.id, 'weirdactions.headpats') || {};
  
  if (!patted) {
    client.awaitReply(message, 'who do you want to headpat? relpy `cancel` to cancel the command.', 10000)
    .then((resp) => {
      if (resp.content.toLowerCase() === 'cancel') return message.reply('command canceled');
      
      const pattie = resp.mentions.members.first();
      if (!pattie) return message.reply('failed to understand, command canceled');
      hug(client, patter, pattie, patCount, message);
    })
    .catch(() => {
      return message.reply('ran out of time command canceled');
    })
  } else {
    hug(client, patter, patted, patCount, message);
  }

}

const hug = (client, patter, patted, patCount, message) => {
  (patCount[patted.id]) ? patCount[patted.id]++ : patCount[patted.id] = 1;

  client.userInfo.setProp(patter.id, 'weirdactions.headpats', patCount);

  const embed = {
    "title": `${patter.displayName} headpats ${patted.displayName}`,
    "color": 12648579,
    "timestamp": new Date().toISOString(),
    "footer": {
      "text": (patCount[patted.id] === 1) ? "first headpats from you :3" : `That's ${patCount[patted.id]} headpats now`
    },
    "image": {
      "url": patlinks[Math.floor(Math.random() * patlinks.length)]
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
  name: "pat",
  category: "Miscelaneous",
  description: "pats someones head",
  usage: "pat @someone"
};