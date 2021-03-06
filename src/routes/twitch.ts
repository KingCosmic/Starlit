import express, { Router } from 'express'
const router = Router();

import { verifyTwitchSignature } from '../helpers/twitch'
import { api } from '../twitchapi'
import DB from '../db'

// grab our state so we can use our discord client
import State from '../state/app'
import { MessageEmbed, TextChannel } from 'discord.js';

// we need to verify twitch's signature
router.post('/webhook', express.json({ verify: verifyTwitchSignature }), async (req, res) => {
  // grab the message type
  const messageType = req.header('Twitch-Eventsub-Message-Type');

  console.log(messageType);

  // if this is a cb verification
  if (messageType === 'webhook_callback_verification') {
    // log we're verifying
    console.log('Verifying Webhook');
    
    // verifiy the callback
    return res.status(200).send(req.body.challenge);
  }


  const { type } = req.body.subscription;
  const { event } = req.body;

  if (type === 'stream.online') {
    try {
      sendOnline(event);
    } catch (ex) {
      console.log(
        `An error occurred sending the Online notification for ${event.broadcaster_user_name}: `,
        ex
      );
    }
  }

  console.log(
    `Receiving ${type} request for ${event.broadcaster_user_name}: `,
    event
  );

  res.status(200).end();
});

async function sendOnline(event) {
  // grab the stream this user is running
  const stream = await api.helix.streams.getStreamByUserId(
    event.broadcaster_user_id
  );
  // grab the game of the stream
  const game = await stream.getGame();

  // grab the user that this stream belongs to
  // used specifically for the user's pfp url
  const user = await stream.getUser()

  // this is our image of what's currently going on in the stream.
  const imgUrl = stream.getThumbnailUrl(1920, 1080);

  // grab our live event data
  const updateData = await DB.LED.find({
    user_id: user.id
  }).toArray()

  // if there is no channels that subscribed to this event
  // (idk how this would happen)
  if (updateData.length === 0) return;

  // loop through the updates to send to our discord.
  for (let ud = 0; ud < updateData.length; ud++) {
    let data = updateData[ud];

    const channel = await State.client.channels.fetch(
      data.channel_id
    ) as TextChannel

    // @ts-ignore
    const embed:MessageEmbed = {
      title: `${stream.userDisplayName} is playing ${game.name} on Twitch!`,
      description: stream.title,
      url: `https://twitch.tv/${stream.userName}`,
      color: 4124316,
      timestamp: stream.startDate.getTime(),
      thumbnail: {
        url: user.profilePictureUrl
      },
      image: {
        url: imgUrl
      },
      footer: {
        iconURL: user.profilePictureUrl,
        text: "come check out the stream!"
      }
    }

    // ignore this cause we know it's a text guild channel.
    channel.send(`${channel.guild.roles.everyone}`, {
      embed
    });
  }
  console.log(
    `Online notification for ${event.broadcaster_user_name} sent.`
  );
};


export default router