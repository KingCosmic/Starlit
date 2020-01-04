const { Command } = require('discord.js-commando');
const ytSearch = require('yt-search')

const { youtubeapitoken } = require('../../config');

const queue = require('../../state/queue');

module.exports = class MeowCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'play',
      group: 'music',
      memberName: 'play',
      description: 'queue\'s a song to play and starts playing if paused.',
    });
  }

  run(message) {
    const searchcontent = message.content.slice(5);

    if (searchcontent.length === 0) return message.reply('specify a queury or link to play');

    // the space in front of this IS REQUIRED
    if (searchcontent.startsWith(' https://www.youtube.com')) {
      return queue.play(message, {
        title: searchcontent,
        url: searchcontent
      })
    }

    ytSearch(searchcontent, (err, results) => {
      if (err) return console.log(err.toString());

      for (let v = 0; v < results.videos.length; v++) {

        if (results.videos[v].url.startsWith('/')) return queue.play(message, results.videos[v]);
      }
    })
  }
}