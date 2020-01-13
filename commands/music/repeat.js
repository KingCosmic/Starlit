const { Command } = require('discord.js-commando');

const queue = require('../../state/queue');

module.exports = class MeowCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'repeat',
      group: 'music',
      memberName: 'repeat',
      description: 'toggles repeating for the last song',
    });
  }

  run(message) {
    queue.toggleRepeat();

    message.reply(`repeat is ${(queue.repeat) ? 'on' : 'off'}`);
  }
}