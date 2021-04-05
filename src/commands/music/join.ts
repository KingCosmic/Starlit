import { Message } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando'

import MusicState from '../../state/music'

class JoinCommand extends Command {
  constructor(client:CommandoClient) {
    super(client, {
      name: 'join',
      group: 'music',
      memberName: 'join',
      description: 'makes the bot join the vc.',
    });
  }

  run(message:CommandoMessage):Promise<Message | Message[]> {
    MusicState.join(message);

    return message.say('I joined your channel')
  }
}

export default JoinCommand