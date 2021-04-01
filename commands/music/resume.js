const { Command } = require('discord.js-commando');

const queue = require('../../state/queue');

module.exports = class MeowCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'resume',
      group: 'music',
      memberName: 'resume',
      description: 'resumes the current queue.',
    });
  }

  run(message) {
    if (queue.dispatcher === undefined) return message.reply('no music playing');
    if (queue.playing) return message.reply('already playing');

    queue.resumePlaying();
    message.channel.send('music resumed');
  }
}