const { CommandoClient } = require('discord.js-commando');
const path = require('path');

const config = require('./config');

const client = new CommandoClient({
  commandPrefix: config.prefix,
  owner: config.owner,
});

client.registry
  .registerDefaultTypes()
  .registerGroups([
    ['music', 'music commands for the friends'],
  ])
  .registerDefaultGroups()
  .registerDefaultCommands()
  .registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
  client.user.setActivity('with Commando');
});

client.on('error', console.error);

client.login(config.token);