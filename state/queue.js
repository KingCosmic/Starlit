const yt = require('ytdl-core');

class Queue {
  constructor() {
    // state variables
    this.songs = [];
    this.currentSong = undefined;
    this.playing = false;
    // our voice connection
    this.dispatcher = undefined;
    this.connection = undefined; // gets set by commands

    // option flags
    this.repeat = false;

    this.nextSong = this.nextSong.bind(this);
  }

  toggleRepeat() {
    this.repeat = !this.repeat;
  }

  // runs when song is over (also runs when a song is skipped)
  nextSong() {
    let song;

    if (this.repeat) {
      song = this.currentSong;
    } else {
      song = this.currentSong = this.songs.shift();
    }

    if (song === undefined) return this.endOfQueue();

    this.channel.send(`Playing: **${song.title}** as requested by: **${song.requester}**`);
    this.dispatcher = this.channel.guild.voice.connection.play(yt(song.url.trim(), { filter: 'audioonly' }));
    this.playing = true;

    this.dispatcher.on('end', () => {
      this.nextSong();
    });

    this.dispatcher.on('error', (err) => {
      this.channel.send('error: ' + err)
      this.nextSong()
    });
  }

  join(message) {
    const voice = message.member.voice;
    if (!voice || voice.channel.type !== 'voice') return message.reply('I couldn\'t connect to your voice channel...');
    this.channel = message.channel;
    return voice.channel.join(connection => {
      this.connection = connection;
    })
  }

  // the difference between this function and nextSong
  // is that we need different things to start and continue
  play(message, song) {
    // add song to queue
    if (song === undefined) return;
    song.requester = message.author.username
    this.songs.push(song);
    message.channel.send(`Added **${song.title}** to the queue, requested by: **${song.requester}**`);
    // check if this is the first only song in queue and that we're in a vc
    // also check if we're playing already because if there is a song playing
    // if so just start the song
    if (this.songs.length === 1 && this.playing === false && this.connection) return this.nextSong(message);
    
    // if we are not in vc join it then play
    if (!this.connection) return this.join(message).then(() => this.nextSong(message));

    // this will make sure the playing flag is set
    // it does it's own check so we just call it regardless tbh.
    this.resumePlaying();
  }

  endOfQueue() {
    this.channel.send('Queue is empty');
    if (this.connection) this.connection.disconnect();
    this.connection = undefined;
    this.channel = undefined;
    this.playing = false;
  }

  resumePlaying() {
    if (!this.playing) this.playing = true;
    this.dispatcher.resume();
  }

  pausePlaying() {
    if (this.playing) this.playing = false;
    this.dispatcher.pause();
  }
}

module.exports = new Queue();