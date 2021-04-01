import { Message } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando'

import queue from '../../state/queue'

class ResumeCommand extends Command {
  constructor(client:CommandoClient) {
    super(client, {
      name: 'resume',
      group: 'music',
      memberName: 'resume',
      description: 'resumes the current queue.',
    });
  }

  run(message:CommandoMessage):Promise<Message | Message[]> {
    if (queue.dispatcher === undefined) return message.say('no music playing');
    if (queue.playing) return message.say('already playing');

    queue.resumePlaying();
    message.say('music resumed');
  }
}

export default ResumeCommand