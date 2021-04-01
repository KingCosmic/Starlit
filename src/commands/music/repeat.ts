import { Message } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando'

import queue from '../../state/queue'

class RepeatCommand extends Command {
  constructor(client:CommandoClient) {
    super(client, {
      name: 'repeat',
      group: 'music',
      memberName: 'repeat',
      description: 'toggles repeating for the last song',
    });
  }

  run(message:CommandoMessage):Promise<Message | Message[]> {
    queue.toggleRepeat();

    return message.say(`repeat is ${(queue.repeat) ? 'on' : 'off'}`);
  }
}

export default RepeatCommand