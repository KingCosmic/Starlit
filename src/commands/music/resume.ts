import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando'
import { Message } from 'discord.js'

import MusicState from '../../state/music'

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
    // check if we have a state for this guild
    if (!MusicState.hasGuild(message.guild.id)) return message.say('no music playing.');

    // resume the playing it does the checks itself
    MusicState.resumePlaying(message.guild.id);

    // user feedback
    message.say('music resumed');
  }
}

export default ResumeCommand