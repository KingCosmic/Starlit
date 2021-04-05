import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando'
import { Message } from 'discord.js'

import MusicState from '../../state/music'

class TimeCommand extends Command {
  constructor(client:CommandoClient) {
    super(client, {
      name: 'time',
      group: 'music',
      memberName: 'time',
      description: 'queue\'s a song to play and starts playing if paused.',
    });
  }

  run(message:CommandoMessage):Promise<Message | Message[]> {
    if (!MusicState.hasGuild(message.guild.id)) return message.say('no music playing');

    // grab the state
    const state = MusicState.guilds.get(message.guild.id);
  
    // grab the stream time.
    const { streamTime } = state.dispatcher;

    return message.say(`time: ${Math.floor(streamTime / 60000)}:${Math.floor((streamTime % 60000) / 1000) < 10 ? '0' + Math.floor((streamTime % 60000) / 1000) : Math.floor((streamTime % 60000) / 1000)}`);
  }
}

export default TimeCommand