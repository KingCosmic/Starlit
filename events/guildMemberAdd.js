// This event executes when a new member joins a server. Let's welcome them!

// const embeds = require("../embeds").welcome;

module.exports = (client, member) => {
  /*
  // Load the guild's settings
  const settings = client.getGuildSettings(member.guild);

  // If welcome is off, don't proceed (don't welcome the user)
  if (settings.welcomeEnabled !== "true") return;

  // Send the welcome message to the welcome channel
  // There's a place for more configs here.
  const channel = member.guild.channels.find("name", settings.welcomeChannel);
  
  channel.send({
    embed: embeds.guild(client, member)
  })
  .then(() => {
    member.send({
      embed: embeds.dm(client, member)
    })
  })
  .catch(console.error);*/
};
