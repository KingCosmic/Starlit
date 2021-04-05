import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando'
import { Message } from 'discord.js'

import MusicState from '../../state/music'

class RepeatCommand extends Command {
  constructor(client:CommandoClient) {
    super(client, {
      name: 'repeat',
      group: 'music',
      memberName: 'repeat',
      description: 'toggles repeating for the last song',
    });
  }

  run(message:CommandoMessage):Promise<Message | Message[]> {
    if (!MusicState.hasGuild(message.guild.id)) return message.say('no music playing to repeat.');

    const repeat = MusicState.toggleRepeat(message.guild.id);

    return message.say(`repeat is ${(repeat) ? 'on' : 'off'}`);
  }
}

export default RepeatCommand