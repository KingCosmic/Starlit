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

  run(message:CommandoMessage) {
    if (queue.dispatcher === undefined) return message.reply('no music playing');
    if (queue.playing) return message.reply('already playing');

    queue.resumePlaying();
    message.channel.send('music resumed');
  }
}

export default ResumeCommand