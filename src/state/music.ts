import yt from 'ytdl-core'

import { TextChannel, StreamDispatcher, VoiceConnection } from 'discord.js'
import { CommandoMessage } from 'discord.js-commando';

interface Song {
  title:string,
  requester:any,
  url:string
}

interface GuildState {
  queue:Song[],
  currentSong?:Song,
  playing:boolean,
  repeat:boolean,
  dispatcher?:StreamDispatcher,
  connection:VoiceConnection
  channel:TextChannel
}

class MusicState {
  public guilds:Map<string, GuildState> = new Map();

  constructor() {}

  public hasGuild(guild_id:string) {
    return this.guilds.has(guild_id);
  }

  public toggleRepeat(guild_id:string) {
    // if we have no state for this guild just return.
    if (!this.hasGuild(guild_id)) return;

    // grab the guilds music state
    let state = this.guilds.get(guild_id);

    // toggle the repeat
    state.repeat = !state.repeat;

    // save the data
    this.guilds.set(guild_id, state);

    return state.repeat;
  }

  // runs when song is over (also runs when a song is skipped)
  public nextSong(guild_id:string) {
    // if we have no state for this guild just return.
    if (!this.hasGuild(guild_id)) return;

    let state = this.guilds.get(guild_id);

    let song:Song;

    if (state.repeat) {
      song = state.currentSong;
    } else {
      song = state.currentSong = state.queue.shift();
    }

    if (song === undefined) return this.endOfQueue(guild_id);

    state.channel.send(`Playing: **${song.title}** as requested by: **${song.requester}**`);
    state.dispatcher = state.channel.guild.voice.connection.play(yt(song.url.trim(), { filter: 'audioonly' }));
    state.playing = true;

    state.dispatcher.on('finish', () => {
      this.nextSong(guild_id);
    });

    state.dispatcher.on('error', (err) => {
      state.channel.send('error: ' + err);
      this.nextSong(guild_id);
    });
  }

  public async join(message:CommandoMessage) {
    // grab the current state for some checks
    let state = this.guilds.get(message.guild.id);

    // rn just return if we already have a state already
    if (state !== undefined) return;

    /* joining a new voice chat */

    // grab the users voice state
    const voice = message.member.voice;

    // check if they're in a voice channel
    if (!voice || voice.channel.type !== 'voice') {
      message.reply('I couldn\'t connect to your voice channel...');
      return undefined;
    }

    let connection = await voice.channel.join();

    // if we dont have a state we need to make one
    state = {
      queue: [],
      playing: true,
      repeat: false,
      connection,
      channel: message.channel as TextChannel
    }

    this.guilds.set(message.guild.id, state);

    return state
  }

  // the difference between this function and nextSong
  // is that we need different things to start and continue
  async play(message:CommandoMessage, song?:Song) {
    // check if song is undefined somehow
    if (song === undefined) return;

    // grab our state and if we dont have one, make one.
    let state = this.guilds.get(message.guild.id) || await this.join(message);

    // if state is null it means we couldnt connect to the vc or failed to make one
    // for another reason so just return.
    if (state === undefined) return;

    // add the song to our queue.
    state.queue.push(song);

    // if there's more then just the song we added let them know it was added to the queue
    if (state.queue.length > 1 || state.currentSong) message.say(`Added **${song.title}** to the queue, requested by: **${song.requester}**`);

    // if this is the only song in the queue go ahead and state it.
    if (state.queue.length === 1 && !state.currentSong) return this.nextSong(message.guild.id);

    // this will make sure the playing flag is set
    // it does it's own check so we just call it regardless tbh.
    this.resumePlaying(message.guild.id);
  }

  public endOfQueue(guild_id:string, forced:boolean = false) {
    // this is only called internally so we know a state exists
    let state = this.guilds.get(guild_id);

    // update the channel unless it's a force disconnect.
    if (!forced) state.channel.send('Queue is finished. Disconnecting...');

    // disconnect from the voice connection.
    if (state.connection) state.connection.disconnect();
    
    // delete our state
    this.guilds.delete(guild_id);
  }

  public resumePlaying(guild_id:string) {
    // check if we have a state to update
    if (!this.hasGuild(guild_id)) return;

    // grab it
    let state = this.guilds.get(guild_id);

    // are we paused and should resume?
    if (!state.playing) {
      // update the flag
      state.playing = false;

      // resume the dispatcher
      state.dispatcher.resume();

      // update the state.
      this.guilds.set(guild_id, state);
    }
  }

  public pausePlaying(guild_id:string) {
    // check if we have a state to update
    if (!this.hasGuild(guild_id)) return;

    // grab it
    let state = this.guilds.get(guild_id);

    // are we already playing?
    if (state.playing) {
      // update the flag
      state.playing = false;

      // pause the dispatcher
      state.dispatcher.pause();

      // update the state.
      this.guilds.set(guild_id, state);
    }
  }
}

export default new MusicState();