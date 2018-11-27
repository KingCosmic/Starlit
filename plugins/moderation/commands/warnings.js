const Discord = require('discord.js');

exports.run = (client, message, args) => {
  if (args.length === 0) return showAllWarnings(client, message);
  if (args.length === 1) return showUsersWarnings(client, message, args);

  const cmd = args[0];
  const user = message.mentions.users.first() || args[1];

  if (!user) return message.reply('You need to tag a user or provide their id');

  // remove the cmd and mention off the args
  args.splice(0, 2);

  switch(cmd) {
    case 'warn':
      warnUser(client, user, message, args);
      break;
    case 'remove':
      removeWarning(client, user, message, args);
      break;
  }
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['rw'],
  permLevel: 'Trial Mod'
};

exports.help = {
  name: "warnings",
  category: "Moderation",
  description: "removes a warning",
  usage: "warnings"
};

const showAllWarnings = (client, message) => {
  let warnedUsers = client.userInfo.filterArray((user) => (!user.moderation) ? false : user.moderation.warnings.length !== 0);

  const embed = new Discord.RichEmbed()
  .setTitle("Warned users")
  .setColor(16090536);
  
  for (let u = 0; u < warnedUsers.length; u++) {
    let user = warnedUsers[u];

    let warnings = '';
    for (let w = 0; w < user.warnings.length; w++) {
      let warning = user.warnings[w];

      warnings += `${warning.id} | ${warning.day} | ${warning.reason}\n`
    }

    let tag = (client.users.get(user.user)) ? client.users.get(user.user).tag : user.user;

    embed.addField(tag, warnings);
  }
  
  message.channel.send({ embed });
}

const showUsersWarnings = (client, message, args) => {
  const userToCheck = message.mentions.users.first();

  if (!userToCheck) return message.reply('your parameters seem... off. Try again');
  let userWarnings = client.userInfo.getProp(userToCheck.id, 'moderation.warnings') || [];

  const embed = new Discord.RichEmbed()
  .setTitle(`${userToCheck.username}'s warnings`)
  .setColor(16090536);
  
  let warnings = '';
  for (let w = 0; w < userWarnings.length; w++) {
    let warning = userWarnings[w];

    warnings += `${warning.id} | ${warning.day} | ${warning.reason}\n`
  }

  embed.setDescription(warnings);
  
  return message.channel.send({ embed });
}

const warnUser = (client, user, message, args) => {
  // see if there is a reason to warn
  if (!args.length) return message.reply('You need to provide a reason to warn someone');

  let reason = args.join(' ');

  const date = new Date();

  const warning = {
    id: randomId(7),
    day: `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`,
    reason: reason
  }

  let oldwarnings = client.userInfo.getProp(user.id, 'moderation.warnings') || [];

  client.userInfo.setProp(user.id, 'moderation.warnings', oldwarnings.concat([warning]));

  user.send(`You were warned for ${reason}!`);
  message.reply(`${user.username} was warned for ${reason}!`);
}

const removeWarning = (client, user, message, args) => {
  if (args.length === 0) return message.reply('A warning id is needed');

  let id = args[0];

  let warnings = client.userInfo.getProp(user.id, 'moderation.warnings') || [];

  for (let w = 0; w < warnings.length; w++) {
    if (warnings[w].id === id) {
      warnings.splice(w, 1);

      client.userInfo.setProp(user.id, 'moderation.warnings', warnings);

      return message.reply(`Warning ${id} was remove for ${user.username}`);
    }
  }

  message.reply('no id matching that');
}