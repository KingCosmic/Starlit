const { Command } = require('discord.js-commando');

const queue = require('../../state/queue');

module.exports = class MeowCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'join',
      group: 'music',
      memberName: 'join',
      description: 'makes the bot join the vc.',
    });
  }

  run(message) {
    queue.join(message);
  }
}