import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando'

import queue from '../../state/queue'

class JoinCommand extends Command {
  constructor(client:CommandoClient) {
    super(client, {
      name: 'join',
      group: 'music',
      memberName: 'join',
      description: 'makes the bot join the vc.',
    });
  }

  run(message:CommandoMessage) {
    queue.join(message);
  }
}

export default JoinCommand