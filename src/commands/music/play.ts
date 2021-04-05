import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando'
import { Message } from 'discord.js'

import ytSearch from 'yt-search'

import MusicState from '../../state/music'

interface Args {
  query:string
}

class PlayCommand extends Command {
  constructor(client:CommandoClient) {
    super(client, {
      name: 'play',
      group: 'music',
      memberName: 'play',
      description: 'queue\'s a song to play and starts playing if paused.',
      args: [
        {
          key: 'query',
          prompt: 'What query would you like to search?',
          type: 'string',
        }
      ]
    });
  }

  run(message:CommandoMessage, { query }:Args):Promise<Message | Message[]> {
    // do we think the query is a youtube link?
    if (query.startsWith('https://www.youtube.com')) {
      MusicState.play(message, {
        title: query,
        url: query,
        requester: message.author.username
      })

      return 
    }

    // if we didnt get a youtube link start a query.
    ytSearch(query, (err, results) => {
      // if there is a error let our user know
      if (err) {
        console.log(err.toString());
        return message.say(`An error occured ${err.toString()}`);
      }

      // loop through our results
      for (let v = 0; v < results.videos.length; v++) {

        // find the first one that's usable (sorts through adds and what not.)
        if (results.videos[v].url.startsWith('/')) return MusicState.play(message, {
          title: results.videos[v].title,
          url: results.videos[v].url,
          requester: message.author.username
        });
      }
    })
  }
}

export default PlayCommand