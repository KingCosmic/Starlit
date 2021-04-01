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

  run(message:CommandoMessage) {
    queue.toggleRepeat();

    message.reply(`repeat is ${(queue.repeat) ? 'on' : 'off'}`);
  }
}

export default RepeatCommand