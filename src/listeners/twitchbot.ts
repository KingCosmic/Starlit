import { Message } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';
import tmi from 'tmi.js'

const channels = ['828772759509008386']

const channelToDiscord = {
  '#dragonic03': '828772759509008386',
  '#kingcosmicdev': ''
}

const discordToChannel = {
  '828772759509008386': '#dragonic03',
  '': '#kingcosmicdev'
}

const client = new tmi.Client({
	options: {
    clientId: process.env.TWITCH_CLIENT_ID
  },
	connection: { reconnect: true },
	identity: {
		username: process.env.TWITCH_USERNAME,
		password: process.env.TWITCH_PASSWORD
	},
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
      if (!channels.includes(message.channel.id) && message.author.bot) return;

      client.say(discordToChannel[message.channel.id], `${message.author.username}: ${message.content}`);
    }
  }
]

export default events;