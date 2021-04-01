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

  run(message:CommandoMessage) {
    if (message.guild.voice.connection) {
      message.guild.voice.connection.disconnect()
    }
  }
}

export default DisconnectCommand