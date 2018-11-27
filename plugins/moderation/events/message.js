
exports.run = (client, message) => {
  // We'll use the key often enough that simplifying it is worth the trouble.
  const key = message.author.id;
  let userInfo = client.userInfo.get(key);

  // Triggers on new users we haven't seen before.
  if(!userInfo.moderation) {
    // The user and guild properties will help us in filters and leaderboards.
    client.userInfo.setProp(key, 'moderation', {
      warnings: []
    });
  }

}

exports.config = {
  guildOnly: true
}