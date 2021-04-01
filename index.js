require('dotenv').config()

const { CommandoClient } = require('discord.js-commando')
const path = require('path')

const db = require('./db')

const config = require('./config')

const setupListeners = require('./listeners')

const setupExpress = require('./express')

const init = async () => {
  
  await db.connect()
  console.log('connected to database')

  const client = new CommandoClient({
    commandPrefix: config.prefix,
    owner: config.owner,
  });

  setupListeners(client);

  client.registry
  .registerDefaultTypes()
  .registerGroups([
    ['admin', 'admin commands to make life easier'],
    ['twitch', 'commands to setup channels for live messages'],
    ['music', 'music commands for the friends']
  ])
  .registerDefaultGroups()
  .registerDefaultCommands()
  .registerCommandsIn(path.join(__dirname, 'commands'));

  client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
    client.user.setActivity('ooga booga');
  });

  client.on('error', console.error);

  await setupExpress();
  client.login(config.token);
}

init();