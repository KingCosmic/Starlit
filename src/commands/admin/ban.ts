import { Message } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando'

// TODO:(Cosmic)[args]
// change the userToBan into a command arg
// so it auto prompts and is more readable as a whole
class BanCommand extends Command {
  constructor(client:CommandoClient) {
    super(client, {
      name: 'ban',
      aliases: ['b'],
      group: 'admin',
      memberName: 'ban',
      description: 'bans a user from the server',
      userPermissions: ['BAN_MEMBERS']
    });
  }

  run(message:CommandoMessage):Promise<Message | Message[]> {
    const userToBan = message.mentions.members.first()

    if (!userToBan) return message.say('please tag someone to ban');

    userToBan.ban()
    return message.say(`${userToBan}, successfully banned`)
  }
}

export default BanCommand