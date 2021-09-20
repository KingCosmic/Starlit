import { AudioPlayerStatus, AudioResource } from '@discordjs/voice'
import { CommandInteraction } from 'discord.js'

import State from '../../State'
import { Track } from '../../track'

import { BaseCommand } from '../../types'

class Command extends BaseCommand {
  name = 'queue'
  description = 'show the current queue'

  async execute(msg:CommandInteraction, args:any) {
    // grab our subscription
    let sub = State.subscriptions.get(msg.guildId || '')

    // if we have no subscription just let em know.
    if (!sub) return await msg.reply('Not playing in this server!')

    const current =
      sub.audioPlayer.state.status === AudioPlayerStatus.Idle
      ? `Nothing is currently playing!`
      : `Playing **${(sub.audioPlayer.state.resource as AudioResource<Track>).metadata.title}**`

    const queue = sub.queue
      .slice(0, 5)
      .map((track, index) => `${index + 1}) ${track.title}`)
      .join('\n');

    await msg.reply(`${current}\n\n${queue}`);
  }
}

export default new Command()