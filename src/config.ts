/**
 * NOTES:
 *  token - the bot token, keep it secret <secureeeeee>
 *  owner - can be a id or an array of id's these people have control over the bot.
 *  prefix - you know what this is.
 *  youtubeapitoken - token for youtube api so we can listen to music
 */

export default {
  // token for logging in.
  token: process.env.TOKEN,
  // base url for twitch webhooks
  baseUrl: 'https://starlit.glitch.me',
  // owners
  owner: '152186808732483584',
  // prefix
  prefix: '!',
  // yt api token used for music.
  youtubeapitoken: process.env.YTTOKEN
}
