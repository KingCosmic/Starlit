import { CommandoClient } from 'discord.js-commando'
import path from 'path'

import setupListeners from './listeners'

import config from './config'

const setupClient = ():CommandoClient => {
  // create our client.
  const client = new CommandoClient({
    commandPrefix: config.prefix,
    owner: config.owner,
  });

  // commando auto does commands but we have to manually setup our
  // event listeners
  setupListeners(client);

  // setup our commando client.
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

  // once our client is ready log it and change our activity
  client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
    client.user.setActivity('ooga booga');
  });

  // setup a error event
  client.on('error', console.error);

  return client
}

export default setupClient;