/**
 * NOTES:
 *  token - the bot token, keep it secret <secureeeeee>
 *  owner - can be a id or an array of id's these people have control over the bot.
 *  prefix - you know what this is.
 *  youtubeapitoken - token for youtube api so we can listen to music
 */

module.exports = {
  token: process.env.TOKEN,
  owner: '152186808732483584',
  prefix: '!',
  youtubeapitoken: process.env.YTTOKEN
}
