import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando'
import { Message } from 'discord.js'

import { api } from '../../twitchapi'

class UseridCommand extends Command {
  constructor(client:CommandoClient) {
    super(client, {
      name: 'userid',
      group: 'twitch',
      memberName: 'userid',
      description: 'shows the userid of this twitch user.',
      guildOnly: true,
      ownerOnly: true,
      args: [
        {
          key: 'username',
          prompt: 'What is the persons username you want to get live events for?',
          type: 'string',
        }
      ]
    });
  }

  async run(message:CommandoMessage, { username }):Promise<Message | Message[]> {
    // get our user we plan to get events for
    const user = await api.helix.users.getUserByName(username);

    return message.say(`${username}'s id is ${user.id}`);
  }
}

export default UseridCommand