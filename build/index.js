import { readdirSync } from 'fs';
import setupCommands from './setupCommands';
import setupBot from './bot';
import BotState from './State';
// grab all file names from commands directory that are ts files.
const commandFiles = readdirSync('./commands').filter(file => file.endsWith('.ts'));
// loop through each filename we recieved.
for (const file of commandFiles) {
    // grab the command code.
    const command = require(`./commands/${file}`);
    // add the command to our bot state
    BotState.commands.set(command.name, command);
}
// grab command info from all our commands.
const commandInfo = BotState.commands.map(command => command.getInfo());
// setup our slash commands
setupCommands(commandInfo);
// start the bot.
setupBot();
