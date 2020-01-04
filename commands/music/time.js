const { Command } = require('discord.js-commando');

const queue = require('../../state/queue');

module.exports = class MeowCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'time',
      group: 'music',
      memberName: 'time',
      description: 'queue\'s a song to play and starts playing if paused.',
    });
  }

  run(message) {
    if (queue.dispatcher === undefined) return message.reply('no music playing');
  
    const { time } = queue.dispatcher;

    message.channel.sendMessage(`time: ${Math.floor(time / 60000)}:${Math.floor((time % 60000) / 1000) < 10 ? '0' + Math.floor((time % 60000) / 1000) : Math.floor((time % 60000) / 1000)}`);
  }
}