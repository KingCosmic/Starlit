// Load up the discord.js library
const Discord = require('discord.js');
// We also load the rest of the things we need in this file:
const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);
const Enmap = require('enmap');
const Provider = require('enmap-mongo');

// This is your client. Some people call it `bot`, some people call it `self`,
// some might call it `cootchie`. Either way, when you see `client.something`,
// or `bot.something`, this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config file that contains our token and our prefix values.
client.config = require('./botconfig.js');
// client.config.token contains the bot's token
// client.config.prefix contains the message prefix

// Require our logger
client.logger = require('./setup/logger');

// Let's start by getting some useful functions that we'll use throughout
// the bot, like logs and elevation features.
require('./setup/functions.js')(client);

// Aliases and commands are put in collections where they can be read from,
// catalogued, listed, etc.
client.commands = new Enmap();
client.aliases = new Enmap();
client.events = new Enmap();

// Now we integrate the use of Evie's awesome Enhanced Map module, which
// essentially saves a collection to disk. This is great for per-server configs,
// and makes things extremely easy for this purpose.
// Provider to store our points outside the lifecycle of the bot
client.userInfo = new Enmap({
  provider: new Provider({ 
    name: 'users',
    dbName: client.config.mongo.dbName,
    url: client.config.mongo.url
  })
});

client.settings = new Enmap({
  provider: new Provider({
    name: 'settings',
    dbName: client.config.mongo.dbName,
    url: client.config.mongo.url
  })
})

// We're doing real fancy node 8 async/await stuff here, and to do that
// we need to wrap stuff in an anonymous function. It's annoying but it works.

const init = async () => {

  await client.settings.defer;
  await client.userInfo.defer;

  // Here we load **plugins** into memory, as a collection, so they're accessible
  // here and everywhere else.
  const plugins = await readdir('./plugins/');
  client.logger.log(`Loading a total of ${plugins.length} plugins.`);
  plugins.forEach(plugin => {
    // if (!plugin.endsWith('.js')) return;
    const response = client.loadPlugin(plugin);
    if (response) console.log(response);
  });

  // Then we load events, which will include our message and ready event.
  const evtFiles = await readdir('./events/');
  client.logger.log(`Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split('.')[0];
    const event = require(`./events/${file}`);
    
    // Bind the client to any event, before the existing arguments
    // provided by the discord.js event. 
    // This line is awesome by the way. Just sayin'.
    client.on(eventName, event.bind(null, client));
  });

  // Generate a cache of client permissions for pretty perms
  client.levelCache = {};
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i];
    client.levelCache[thisLevel.name] = thisLevel.level;
  }

  // Here we login the client.
  client.login(client.config.token);

// End top-level async/await function.
};

init();
