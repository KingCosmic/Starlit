import { CommandoClient } from 'discord.js-commando'
import path from 'path'

import setupListeners from './listeners'

import config from './config'

const setupClient = ():CommandoClient => {
  // create our client.
  const client = new CommandoClient({
    commandPrefix: config.prefix,
    owner: config.owner,
    invite: 'https://discord.gg/MKHXQfNGff'
  });

  // commando auto does commands but we have to manually setup our
  // event listeners
  setupListeners(client);

  // setup our commando client.
  client.registry
  .registerDefaultTypes()
  .registerGroups([
    ['admin', 'admin commands to make life easier'],
    ['code', 'commands for programmers'],
    ['music', 'music commands for the friends'],
    ['twitch', 'commands to setup channels for live messages']
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

  // return our client so we can use it later on.
  return client
}

export default setupClient;