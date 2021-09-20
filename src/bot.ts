import { Client, Intents } from 'discord.js'
import BotState from './State'

import config from './config'

function setupBot() {
  const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES] })

  client.on('ready', () => {
    console.log(`Logged in as ${client.user?.tag}!`)
  })

  client.on('interactionCreate', async interaction => {
    // if it isn't a command just return.
    if (!interaction.isCommand()) return

    const { commandName, options } = interaction

    // just return out if we can't find that command.
    if (!BotState.commands.has(commandName)) return

    try {
      BotState.commands.get(commandName)?.get(options.getSubcommand())?.execute(interaction, null)
    } catch (error) {
      console.error(error);
      await interaction.reply('there was an error trying to execute that command!')
    }
  })

  client.login(config.token)
}

export default setupBot