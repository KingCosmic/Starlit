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
    });
  }

  run(message:CommandoMessage) {
    const userToBan = message.mentions.members.first()

    if (!userToBan) return message.reply('please tag someone to ban');

    userToBan.ban()
    return message.channel.send(`${userToBan}, successfully banned`)
  }
}

export default BanCommand