const { Command } = require('discord.js-commando');

const { api } = require('../../twitch');
const DB = require('../../db');

const config = require('../../config');

const axios = require('axios');

module.exports = class AddCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'add',
      group: 'twitch',
      memberName: 'add',
      description: 'adds a twitch account to recieve live events for.',
      args: [
        {
          key: 'username',
          prompt: 'What is the persons username you want to get live events for?',
          type: 'string',
        }
      ]
    });
  }

  async run(message, { username }) {
    // get our user we plan to get events for
    const user = await api.helix.users.getUserByName(username);

    // make a post request to get our new webhooks
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
        'Authorization': `Bearer ${process.env.TWITCH_CLIENT_SECRET}`,
        'Content-Type': 'application/json'
      }
    });

    // insert this data into the database
    await DB.LED.insertOne({
      channel_id: message.channel.id,
      user_id: user.id
    });

    // give some user feedback
    message.say(`this channel will be notified once ${username} goes live.`);
  }
}