
exports.run = (client, message) => {
  // We'll use the key often enough that simplifying it is worth the trouble.
  const key = message.author.id;
  let userInfo = client.userInfo.get(key);

  // Triggers on new users we haven't seen before.
  if(!userInfo.economy) {
    // The user and guild properties will help us in filters and leaderboards.
    client.userInfo.setProp(key, 'economy', {
      points: 0,
      level: 1,
      coins: 0,

      inventory: []
    });

    return;
  }

  // Get only the current points for the user.
  let currentPoints = userInfo.economy.points;
  let currentYen = userInfo.economy.coins;

  // Increment the points and save them.
  client.userInfo.setProp(key, "economy.points", ++currentPoints);
  // same for yen
  client.userInfo.setProp(key, 'economy.coins', ++currentYen);

  // Calculate the user's current level
  const curLevel = Math.floor(0.1 * Math.sqrt(currentPoints));

  // Act upon level up by sending a message and updating the user's level in enmap.
  if (userInfo.economy.level < curLevel) {
    currentYen += (3 * curLevel);
    
    client.userInfo.setProp(key, 'economy.coins', currentYen);
    client.userInfo.setProp(key, "economy.level", curLevel);
    message.reply(`You've leveled up to level **${curLevel}**! You got ${currentYen} Yen! Ain't that dandy?`);
  }
}

exports.config = {
  guildOnly: true
}