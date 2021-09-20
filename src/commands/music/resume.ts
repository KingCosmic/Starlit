import { CommandInteraction } from 'discord.js'

import State from '../../State'

import { BaseCommand } from '../../types'

class Command extends BaseCommand {
  name = 'resume'
  description = 'resumes the player.'

  async execute(msg:CommandInteraction, args:any) {
    // grab our subscription
    let sub = State.subscriptions.get(msg.guildId || '')

    // if we have no subscription just let em know.
    if (!sub) return await msg.reply('Not playing in this server!')

    // unpause the audio player
    sub.audioPlayer.unpause()

    // reply the user
    await msg.reply({ content: `Unpaused!`, ephemeral: true })
  }
}

export default new Command()