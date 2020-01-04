const yt = require('ytdl-core');

class Queue {
  constructor() {
    // state variables
    this.songs = [];

    // option flags
    this.playing = false;
    this.repeat = false;
    this.dispatcher = undefined; // gets set by commands

    this.nextSong = this.nextSong.bind(this);
  }

  // remove a song by index in queue
  removeSong(index) {

  }

  // runs when song is over (also runs when a song is skipped)
  nextSong() {
    const song = this.songs.shift();

    if (song === undefined) return this.endOfQueue();

    this.channel.send(`Playing: **${song.title}** as requested by: **${song.requester}**`);
    this.dispatcher = this.channel.guild.voiceConnection.playStream(yt(`https://www.youtube.com${song.url}`, { audioonly: true }), { passes: 1 });
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
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel || voiceChannel.type !== 'voice') return message.reply('I couldn\'t connect to your voice channel...');
    this.channel = message.channel;
    return voiceChannel.join()
  }

  // the difference between this function and nextSong
  // is that we need different things to start and continue
  play(message, song) {
    // add song to queue
    if (song === undefined) return;
    song.requester = message.author.username
    this.songs.push(song);

    // check if this is the first only song in queue and that we're in a vc
    // also check if we're playing already because if there is a song playing
    // if so just start the song
    if (this.songs.length === 1 && this.playing === false && message.guild.voiceConnection) return this.nextSong(message);
    
    // if we are not in vc join it then play
    if (!message.guild.voiceConnection) return this.join(message).then(() => this.nextSong(message));

    // this will make sure the playing flag is set
    // it does it's own check so we just call it regardless tbh.
    this.resumePlaying();
  }

  endOfQueue() {
    this.channel.send('Queue is empty');
    this.channel.guild.voiceConnection.disconnect();
    this.channel = undefined;
    this.dispatcher = undefined;
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