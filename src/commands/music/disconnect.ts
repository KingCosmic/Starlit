import { CommandInteraction } from 'discord.js'

import State from '../../State'

import { BaseCommand } from '../../types'

class Command extends BaseCommand {
  name = 'disconnect'
  description = 'force the bot to leave a vc.'

  async execute(msg:CommandInteraction, args:any) {
    // grab our subscription
    let sub = State.subscriptions.get(msg.guildId || '')

    // if we have no subscription just let em know.
    if (!sub) return await msg.reply('Not playing in this server!')

    sub.voiceConnection.destroy()
    State.subscriptions.delete(msg.guildId || '')

    await msg.reply({ content: 'Left channel!', ephemeral: true })
  }
}

export default new Command()