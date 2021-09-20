import { CommandInteraction } from 'discord.js'

import State from '../../State'

import { BaseCommand } from '../../types'

class Command extends BaseCommand {
  name = 'pause'
  description = 'pause the playback of music'

  async execute(msg:CommandInteraction, args:any) {
    // grab our subscription
    let sub = State.subscriptions.get(msg.guildId || '')

    // if we have no subscription just let em know.
    if (!sub) return await msg.reply('Not playing in this server!')

    // pause our audio player.
    sub.audioPlayer.pause()

    // let em know we paused
		await msg.reply({ content: `Paused!`, ephemeral: true })
  }
}

export default new Command()