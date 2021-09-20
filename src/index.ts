import { readdirSync } from 'fs'
import { SlashCommandBuilder } from '@discordjs/builders'

import setupCommands from './setupCommands'
import setupBot from './bot'

import BotState from './State'
import { BaseCommand } from './types'
import Collection from '@discordjs/collection'

// grab all file names from commands directory that are ts files.
const commandFolders = readdirSync('./src/commands', { withFileTypes: true }).filter(file => file.isDirectory()).map(dirent => dirent.name)

// setup an array for our command info.
const commandInfo = []

for (let f = 0; f < commandFolders.length; f++) {
  const folderName = commandFolders[f]

  const commandFiles = readdirSync(`./src/commands/${folderName}`).filter(file => file.endsWith('.ts'))

  BotState.commands.set(folderName, new Collection())

  // TODO: get command info based on folder directory.
  const CommandBuilder = new SlashCommandBuilder().setName(folderName).setDescription(`commands for ${folderName}`)

  // loop through each filename we recieved.
  for (const file of commandFiles) {
    // grab the command code.
    const { default:command }: { default:BaseCommand } = require(`./commands/${folderName}/${file}`)

    // add the command to our bot state
    BotState.commands.get(folderName)?.set(command.name, command)

    // build our command info
    CommandBuilder.addSubcommand(command.setInfo.bind(command))
  }

  // add the command info to our list.
  commandInfo.push(CommandBuilder)
}

// setup our slash commands
setupCommands(commandInfo)

// start the bot.
setupBot()