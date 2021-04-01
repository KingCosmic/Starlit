import { Message } from 'discord.js';
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

  run(message:CommandoMessage):Promise<Message | Message[]> {
    if (queue.dispatcher === undefined) return message.say('no music playing');
    if (queue.playing === false) return message.say('already paused');

    queue.pausePlaying();
    return message.say('music paused');
  }
}

export default PauseCommand