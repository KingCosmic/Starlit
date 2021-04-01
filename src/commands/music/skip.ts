import { Message } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando'

import queue from '../../state/queue'

class SkipCommand extends Command {
  constructor(client:CommandoClient) {
    super(client, {
      name: 'skip',
      group: 'music',
      memberName: 'skip',
      description: 'skips the current song',
    });
  }

  run(message:CommandoMessage):Promise<Message | Message[]> {
    const dispatcher = queue.dispatcher;

    if (dispatcher === undefined) return message.say('not playing any music');

    dispatcher.end();
    return message.say('skipped')
  }
}

export default SkipCommand