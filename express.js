const express = require('express');
const port = process.env.PORT || 3000;

const { api } = require('./twitch')

const { CourierClient } = require("@trycourier/courier");
const courier = CourierClient();

const crypto = require("crypto");
const db = require('./db');
const twitchSigningSecret = process.env.TWITCH_SECRET;

const verifyTwitchSignature = (req, res, buf, encoding) => {
  const messageId = req.header("Twitch-Eventsub-Message-Id");
  const timestamp = req.header("Twitch-Eventsub-Message-Timestamp");
  const messageSignature = req.header("Twitch-Eventsub-Message-Signature");
  const time = Math.floor(new Date().getTime() / 1000);
  console.log(`Message ${messageId} Signature: `, messageSignature);

  if (Math.abs(time - timestamp) > 600) {
    // needs to be < 10 minutes
    console.log(`Verification Failed: timestamp > 10 minutes. Message Id: ${messageId}.`);
    throw new Error("Ignore this request.");
  }

  if (!twitchSigningSecret) {
    console.log(`Twitch signing secret is empty.`);
    throw new Error("Twitch signing secret is empty.");
  }

  const computedSignature =
    "sha256=" +
    crypto
      .createHmac("sha256", twitchSigningSecret)
      .update(messageId + timestamp + buf)
      .digest("hex");
  console.log(`Message ${messageId} Computed Signature: `, computedSignature);

  if (messageSignature !== computedSignature) {
    throw new Error("Invalid signature.");
  } else {
    console.log("Verification successful");
  }
};

module.exports = async () => {
  const app = express();

  app.use(express.json({ verify: verifyTwitchSignature }));

  app.post("/twitch/webhook", async (req, res) => {
    // grab the message type
    const messageType = req.header("Twitch-Eventsub-Message-Type");

    // if this is a cb verification
    if (messageType === "webhook_callback_verification") {
      // log we're verifying
      console.log("Verifying Webhook");
      
      // verifiy the callback
      return res.status(200).send(req.body.challenge);
    }


    const { type } = req.body.subscription;
    const { event } = req.body;

    if (type === "stream.online") {
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

  const sendOnline = async event => {
    const stream = await api.helix.streams.getStreamByUserId(
      event.broadcaster_user_id
    );
    const game = await stream.getGame();

    const user = await stream.getUser()

    const imgUrl = stream.getThumbnailUrl(1920, 1080);

    const data = await db.LED.findOne({
      user_id: user.id
    })

    if (data == null) return;

    const { messageId } = await courier.send({
      eventId: "TWITCH_ONLINE",
      recipientId: event.broadcaster_user_id,
      profile: {
        discord: {
          "channel_id": data.channel_id
        }
      },
      data: {
        stream,
        game
      },
      override: {
        discord: {
          body: {
            embed: {
              title: `${stream.userDisplayName} is playing ${game.name} on Twitch!`,
              description: stream.title,
              url: `https://twitch.tv/${stream.userName}`,
              color: 4124316,
              timestamp: stream.startDate.toISOString(),
              thumbnail: {
                url: user.profilePictureUrl
              },
              image: {
                url: imgUrl
              },
              footer: {
                icon_url: user.profilePictureUrl,
                text: "come check out the stream!"
              }
            }
          }
        }
      }
    });
    console.log(
      `Online notification for ${event.broadcaster_user_name} sent. Message ID: ${messageId}.`
    );
  };

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  const listener = app.listen(port, () => {
    console.log("Your app is listening on port " + listener.address().port);
  });
}