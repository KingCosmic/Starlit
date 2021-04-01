import { Message } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando'

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
    if (message.guild.voice.connection) {
      message.guild.voice.connection.disconnect()
    }

    return message.say('I disconnected')
  }
}

export default DisconnectCommand