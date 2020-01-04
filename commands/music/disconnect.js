const { Command } = require('discord.js-commando');

const queue = require('../../state/queue');

module.exports = class MeowCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'disconnect',
      aliases: ['leave'],
      group: 'music',
      memberName: 'disconnect',
      description: 'makes the bot leave the vc.',
    });
  }

  run(message) {
    if (message.guild.voiceConnection) {
      message.guild.voiceConnection.disconnect();
    }
  }
}