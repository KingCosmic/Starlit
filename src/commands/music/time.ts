import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando'

import queue from '../../state/queue'

class TimeCommand extends Command {
  constructor(client:CommandoClient) {
    super(client, {
      name: 'time',
      group: 'music',
      memberName: 'time',
      description: 'queue\'s a song to play and starts playing if paused.',
    });
  }

  run(message:CommandoMessage) {
    if (queue.dispatcher === undefined) return message.say('no music playing');
  
    const { time } = queue.dispatcher;

    message.say(`time: ${Math.floor(time / 60000)}:${Math.floor((time % 60000) / 1000) < 10 ? '0' + Math.floor((time % 60000) / 1000) : Math.floor((time % 60000) / 1000)}`);
  }
}

export default TimeCommand