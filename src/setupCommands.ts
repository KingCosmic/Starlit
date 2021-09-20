import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'

import config from './config'

const rest = new REST({ version: '9' }).setToken(config.token)

async function setupCommands(commands:any) {
  try {
    console.log('Started refreshing application (/) commands.')

    await rest.put(
      // if we're in development update commands for test server, otherwise update the commands globally.
      config.isInDevelopment ? Routes.applicationGuildCommands(config.appID, config.testGuildID) : Routes.applicationCommands(config.appID),
      { body: commands },
    )

    console.log('Successfully reloaded application (/) commands.')
  } catch (error) {
    console.error(error)
  }
}

export default setupCommands