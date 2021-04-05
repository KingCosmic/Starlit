import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando'
import { Message } from 'discord.js'

import MusicState from '../../state/music'

class PauseCommand extends Command {
  constructor(client:CommandoClient) {
    super(client, {
      name: 'pause',
      group: 'music',
      memberName: 'pause',
      description: 'pauses the current queue.',
    });
  }

  run(message:CommandoMessage):Promise<Message | Message[]> {
    // check if we have state for this server.
    if (!MusicState.hasGuild(message.guild.id)) return message.say('No music playing to pause');

    // grab the state
    let state = MusicState.guilds.get(message.guild.id);

    // tell em it's already paused
    if (state.playing === false) return message.say('already paused');

    // pause the music
    MusicState.pausePlaying(message.guild.id);

    // let the user know it's paused
    return message.say('music paused');
  }
}

export default PauseCommand