import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando'
import { Message } from 'discord.js'

// grab our state
import MusicState from '../../state/music'

class DisconnectCommand extends Command {
  constructor(client:CommandoClient) {
    super(client, {
      name: 'disconnect',
      aliases: ['leave'],
      group: 'music',
      memberName: 'disconnect',
      description: 'makes the bot leave the vc.',
    });
  }

  run(message:CommandoMessage):Promise<Message | Message[]> {
    // if we have no music state and a voice connection to the server
    // maybe the bot reset while it was connected and state was reset
    if (!MusicState.hasGuild(message.guild.id) && message.guild.voice.connection) {
      // just disconnect and call it a day
      message.guild.voice.connection.disconnect();
    }

    // force end of queue
    MusicState.endOfQueue(message.guild.id, true);

    // give some user feedback
    return message.say('I disconnected')
  }
}

export default DisconnectCommand