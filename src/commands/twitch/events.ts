import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando'
import { Message } from 'discord.js'

import TwitchApi from '../../twitchapi'

class EventsCommand extends Command {
  constructor(client:CommandoClient) {
    super(client, {
      name: 'events',
      group: 'twitch',
      memberName: 'events',
      description: 'shows our twithc subscriptions',
      guildOnly: true,
      ownerOnly: true
    });
  }

  async run(message:CommandoMessage):Promise<Message | Message[]> {
    const { data } = await TwitchApi.getSubscriptions();

    // grab the array of stream.online subs
    const streamNotifs = data.data.filter(d => d.type === 'stream.online');

    return message.say(streamNotifs.map(notifs => notifs.condition.broadcaster_user_id).join('\n'))
  }
}

export default EventsCommand