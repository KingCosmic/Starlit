import { CommandInteraction } from 'discord.js'

import State from '../../State'

import { BaseCommand } from '../../types'

class Command extends BaseCommand {
  name = 'skip'
  description = 'skip the current song.'

  async execute(msg:CommandInteraction, args:any) {
    // grab our subscription
    let sub = State.subscriptions.get(msg.guildId || '')

    // if we have no subscription just let em know.
    if (!sub) return await msg.reply('Not playing in this server!')

    // Calling .stop() on an AudioPlayer causes it to transition into the Idle state. Because of a state transition
    // listener defined in music/subscription.ts, transitions into the Idle state mean the next track from the queue
    // will be loaded and played.
    sub.audioPlayer.stop()

    // reply to the user
    await msg.reply('Skipped song!')
  }
}

export default new Command()