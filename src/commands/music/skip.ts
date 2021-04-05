import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando'
import { Message } from 'discord.js'

import MusicState from '../../state/music'

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
    // check if we have a music state for this guild
    if (!MusicState.hasGuild(message.guild.id)) return message.say('no music playing.');

    // grab the state
    const state = MusicState.guilds.get(message.guild.id);

    // end the current dispatcher so it goes to the next song
    state.dispatcher.end();
    
    // user feedback
    return message.say('skipped')
  }
}

export default SkipCommand