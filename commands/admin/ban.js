const { Command } = require('discord.js-commando');

module.exports = class MeowCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'ban',
      aliases: ['b'],
      group: 'admin',
      memberName: 'ban',
      description: 'bans a user from the server',
    });
  }

  run(message) {
    const userToBan = message.mentions.members.first()

    if (!userToBan) return message.reply('please tag someone to ban');

    userToBan.ban()
    return message.channel.send(`${userToBan}, successfully banned`)
  }
}