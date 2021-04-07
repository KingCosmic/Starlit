import { CommandoClient } from 'discord.js-commando'
import { Message } from 'discord.js'

import tmi from 'tmi.js'

// array of discord channels we are syncing
const channels = ['828772759509008386']

// twitch channel to it's respective discord channel
const channelToDiscord = {
  '#dragonic03': '828772759509008386',
  '#kingcosmicdev': ''
}

// discord channel to it's respective twitch channel
const discordToChannel = {
  '828772759509008386': '#dragonic03',
  '': '#kingcosmicdev'
}

// setup our client
const client = new tmi.Client({
	options: {
    clientId: process.env.TWITCH_CLIENT_ID
  },
	connection: { reconnect: true },
	identity: {
		username: process.env.TWITCH_USERNAME,
		password: process.env.TWITCH_PASSWORD
	},
  // channels to listen for events from.
	channels: [ 'dragonic03', 'kingcosmicdev' ]
});

const events = [
  {
    event: 'ready',
    callback: async (discordclient:CommandoClient) => {

      client.on('message', async (channel, tags, message, self) => {
        if (self) return;

        const dchannel = await discordclient.channels.fetch(channelToDiscord[channel.toLowerCase()]);

        // @ts-ignore
        dchannel.send(`${tags.username}: ${message}`);
      });

      // connect to the twitch chat
      await client.connect();
      console.log('twitch client connected');
    }
  },

  {
    event: 'message',
    callback: async (discordclient:CommandoClient, message:Message) => {
      if (!channels.includes(message.channel.id) || message.author.bot) return;

      client.say(discordToChannel[message.channel.id], `${message.author.username}: ${message.content}`);
    }
  }
]

export default events;