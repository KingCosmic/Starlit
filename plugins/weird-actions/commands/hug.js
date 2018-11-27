
const huglinks = [
  'https://cdn.discordapp.com/attachments/471600179662028802/473165810186321921/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/473165810412683284/9d6f5df68f7082589782ed6205e438e603376219_hq.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/473165819036041216/1411533189731.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/473165821477126144/b039670915d743046851031677054e88.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/473165824446955581/tenor.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/473165825537343498/Hei-X-Yin-darker-than-black-hei-x-yin-35605239-500-281.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/473165835955994624/tuH4gqZ.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/473165886786895912/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/473165894848086016/1528604124613.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/473165896609693696/ab58a8f3ad91fd62911f84bf3d54127c.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/473165906218844160/anime-girl-gif-overwork-google-search-gifs-pinterest-anime-anime-girl-gif-overwork-google-search-hug.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/473165906776686602/anime-girl-hug-gif-10.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/473165912690786304/anime-hugging-gif-11.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/473165913143902210/d69b8ce822eac0d007aeeb26228e8a50.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/473165918000775168/d165746cb75f8cde4923f612e8fb2a09.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/473165922371239956/f2805f274471676c96aff2bc9fbedd70.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/473165926892830730/giphy.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/473165929824518155/hugging-anime-gif-8.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/473165933146275851/hugging-anime-gif-12.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/473165936828874762/p7beIyD.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/473165948887629824/tenor_1.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/473165949512712193/TB8f0vZ.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/473165965371375626/tumblr_o5u9l1rBqg1ttmhcxo1_500.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/473165967770255370/tumblr_of5pzfGSuq1v8tshbo1_500.gif',
  'https://cdn.discordapp.com/attachments/471600179662028802/473165968198205449/tenor.gif'
];

exports.run = (client, message, args) => {
  const hugged = message.mentions.members.first();
  const hugger = message.member;

  const hugCount = client.userInfo.getProp(hugger.id, 'weirdactions.hugs') || {};
  
  if (!hugged) {
    client.awaitReply(message, 'who do you want to hug? reply `cancel` to cancel the command.', 10000)
    .then((resp) => {
      if (resp.content.toLowerCase() === 'cancel') return message.reply('command canceled');
      
      const huggie = resp.mentions.members.first();
      if (!huggie) return message.reply('failed to understand, command canceled');
      hug(client, hugger, huggie, hugCount, message);
    })
    .catch(() => {
      return message.reply('ran out of time command canceled');
    })
  } else {
    hug(client, hugger, hugged, hugCount, message);
  }

}

const hug = (client, hugger, hugged, hugCount, message) => {
  (hugCount[hugged.id]) ? hugCount[hugged.id]++ : hugCount[hugged.id] = 1;

  client.userInfo.setProp(hugger.id, 'weirdactions.hugs', hugCount);

  const embed = {
    "title": `${hugger.displayName} hugs ${hugged.displayName}`,
    "color": 12648579,
    "timestamp": new Date().toISOString(),
    "footer": {
      "text": (hugCount[hugged.id] === 1) ? "first hug from you :3" : `That's ${hugCount[hugged.id]} hugs now`
    },
    "image": {
      "url": huglinks[Math.floor(Math.random() * huglinks.length)]
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
  name: "hug",
  category: "Miscelaneous",
  description: "hugs someone",
  usage: "hug @someone"
};