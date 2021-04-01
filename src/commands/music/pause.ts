import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando'

import queue from '../../state/queue'

class PauseCommand extends Command {
  constructor(client:CommandoClient) {
    super(client, {
      name: 'pause',
      group: 'music',
      memberName: 'pause',
      description: 'pauses the current queue.',
    });
  }

  run(message:CommandoMessage) {
    if (queue.dispatcher === undefined) return message.reply('no music playing');
    if (queue.playing === false) return message.reply('already paused');

    queue.pausePlaying();
    message.channel.send('music paused');
  }
}

export default PauseCommand