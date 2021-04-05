import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando'
import { Message } from 'discord.js'

import TwitchApi, { api } from '../../twitch'
import DB from '../../db'

import config from '../../config'

class AddCommand extends Command {
  constructor(client:CommandoClient) {
    super(client, {
      name: 'add',
      group: 'twitch',
      memberName: 'add',
      description: 'adds a twitch account to recieve live events for.',
      guildOnly: true,
      userPermissions: ['MANAGE_CHANNELS'],
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

    // check if our current subscriptions include this person.
    let isSubbed = false;
    try {
      const { data } = await TwitchApi.getSubscriptions();

      console.log(data)

      if (data.total_cost === data.max_total_cost) return message.say('cannot listen for more status changes.');

      // grab the array of stream.online subs
      const streamNotifs = data.data.filter(d => d.type === 'stream.online');
      // now grab the sub to this user 
      const sub = streamNotifs.find(d => d.condition.broadcaster_user_id === user.id);

      // we're subbed to this user already
      if (sub !== null) isSubbed = true;
    } catch(e) {
      console.log(e);
      return message.say(e);
    }

    // if we're not subbed we want to setup a subscription
    if (!isSubbed) {
      // make a post request to get our new webhooks
      try {
        await TwitchApi.setupSubscription(user.id);
      } catch(e) {
        console.log(e)
        return message.say(e)
      }
    }

    // insert this data into the database
    await DB.LED.insertOne({
      channel_id: message.channel.id,
      user_id: user.id
    });

    // give some user feedback
    return message.say(`this channel will be notified once ${username} goes live.`);
  }
}

export default AddCommand