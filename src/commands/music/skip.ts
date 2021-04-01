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

  run(message:CommandoMessage) {
    const dispatcher = queue.dispatcher;

    if (dispatcher === undefined) return message.reply('not playing any music');

    dispatcher.end();
  }
}

export default SkipCommand