const games = ['a spooky game', 'with sweet wrappers', 'with my Witch hat'];

module.exports = async (client) => {
  // Log that the bot is online.
  client.logger.log(`[READY] ${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`, "ready");

  // Make the bot "play the game" which is the help command with default prefix.
  client.user.setActivity(`Type ${client.config.defaultSettings.prefix}help for the list of commands!`, {type: "PLAYING"});

  setInterval(() => {
    client.user.setActivity(games[Math.floor(Math.random() * games.length)], { type: 'PLAYING' });
  }, 15000);
};