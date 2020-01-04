const { Command } = require('discord.js-commando');

const queue = require('../../state/queue');

module.exports = class MeowCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'skip',
      group: 'music',
      memberName: 'skip',
      description: 'skips the current song',
    });
  }

  run(message) {
    const dispatcher = queue.dispatcher;

    if (dispatcher === undefined) return message.reply('not playing any music');

    dispatcher.end();
  }
}