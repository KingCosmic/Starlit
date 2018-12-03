// This event executes when a new member joins a server. Let's welcome them!

module.exports = (client, member) => {

  // here we check for the plugins that have registered and event to happen on this function
  // and loop through them
  let events = client.events.get('guildMemberAdd') || [];

  events.forEach((event) => {
    event.run(client, member)
  })
};
