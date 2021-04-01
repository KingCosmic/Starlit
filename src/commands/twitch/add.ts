import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando'
import axios from 'axios'

import { api } from '../../twitch'
import DB from '../../db'

import config from '../../config'
import { Message } from 'discord.js'

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

    // make a post request to get our new webhooks
    try {
    const res = await axios({
      method: 'POST',
      url: 'https://api.twitch.tv/helix/eventsub/subscriptions',
      data: {
        "type": "stream.online",
        "version": "1",
        "condition": {
          "broadcaster_user_id": user.id
        },
        "transport": {
          "method": "webhook",
          "callback": `${config.baseUrl}/twitch/webhook`,
          "secret": process.env.TWITCH_SECRET
        }
      },
      headers: {
        'Client-ID': process.env.TWITCH_CLIENT_ID,
        'Authorization': `Bearer ${process.env.TWITCH_AUTH_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    } catch(e) {
      console.log(e)
      return message.say(e)
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