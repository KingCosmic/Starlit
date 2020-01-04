const { Command } = require('discord.js-commando');

const queue = require('../../state/queue');

module.exports = class MeowCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'pause',
      group: 'music',
      memberName: 'pause',
      description: 'pauses the current queue.',
    });
  }

  run(message) {
    if (queue.dispatcher === undefined) return message.reply('no music playing');
    if (queue.playing === false) return message.reply('already paused');

    queue.pausePlaying();
    message.channel.sendMessage('music paused');
  }
}