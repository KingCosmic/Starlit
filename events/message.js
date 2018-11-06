// The MESSAGE event runs anytime a message is received
// Note that due to the binding of client to every event, every event
// goes `client, other, args` when this function is run.

// here's the triggers if it gets to bea lot we'll seperate files
const triggers = [
  
  {
    word: 'cinnamon bun',
    resp: () => ['Did someone mention me?','You rang?'].random()
  },
  
  {
    word: 'cookie',
    resp: () => ['COOKIE?','Did someone say cookie?'].random()
  },
  
  {
    word: 'hang',
    resp: () => [':rolling_eyes:','I thought we were better than this...','Ha, ha. Funny. Can you sense my sarcasm?'].random()
  },
  
  {
    word: 'cinnamon buns',
    resp: () => ['Did someone mention me?','You rang?'].random()
  },
  
  {
    word: 'kys',
    resp: () => ['Please don\'t say that', 'Do not say that!', 'Dont be a meanie!'].random()
  },
    
  {
    word: "meanie",
    resp: () => ['Stop right there meanie!', 'Stop being a meanie >:(', 'Be nice :('].random()
  },
  
  {
    word: "good afternoon",
    resp: () => ['Afternoon!', 'Hope you have a good rest of your day!', 'Gosh it\'s late'].random()
  },
  
  {
    word: "good morning",
    resp: () => ['Morning!', 'Have a great day!', 'I hope you had a nice sleep'].random()
  },
  
  {
    word: "good night",
    resp: () => ['Sweet Dreams!', 'Nighty Night', 'Have a nice sleep!'].random()
  },
]

const containsTrigger = (content) => {
  for (let i = 0; i < triggers.length; i++) {
    if (content.toLowerCase().includes(triggers[i].word)) {
      return triggers[i].resp()
    }
  }
  return false
}

module.exports = (client, message) => {
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if (message.author.bot) return;

  // We'll use the key often enough that simplifying it is worth the trouble.
  const key = message.author.id;

  // Triggers on new users we haven't seen before.
  if(!client.userInfo.has(key)) {
    // The user is setup with a blank object. plugins setup what variables they need
    client.userInfo.set(key, {});
  }

  // here we check for the plugins that have registered and event to happen on this function
  // and loop through them
  let events = client.events.get('message') || [];

  events.forEach((event) => {
    event.run(client, message)
  })

  // Grab the settings for this server from Enmap.
  // If there is no guild, get default conf (DMs)
  const settings = message.settings = client.getGuildSettings(message.guild);
  
  const isTriggered = containsTrigger(message.content);
  
  if (message.content.indexOf(settings.prefix) !== 0 && isTriggered) {
    message.channel.send(isTriggered)
  }

  // Also good practice to ignore any message that does not start with our prefix,
  // which is set in the configuration file.
  if (message.content.indexOf(settings.prefix) !== 0) return;

  // Here we separate our "command" name, and our "arguments" for the command.
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Get the user or member's permission level from the elevation
  const level = client.permlevel(message);

  // Check whether the command, or alias, exist in the collections defined
  // in app.js.
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
  // using this const varName = thing OR otherthign; is a pretty efficient
  // and clean way to grab one of 2 values!
  if (!cmd) return;

  // Some commands may not be useable in DMs. This check prevents those commands from running
  // and return a friendly error message.
  if (cmd && !message.guild && cmd.conf.guildOnly)
    return message.channel.send("This command is unavailable via private message. Please run this command in a guild.");

  if (level < client.levelCache[cmd.conf.permLevel]) {
    if (settings.systemNotice === "true") {
      return message.channel.send(`You do not have permission to use this command.
  Your permission level is ${level} (${client.config.permLevels.find(l => l.level === level).name})
  This command requires level ${client.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})`);
    } else {
      return;
    }
  }

  // To simplify message arguments, the author's level is now put on level (not member so it is supported in DMs)
  // The "level" command module argument will be deprecated in the future.
  message.author.permLevel = level;
  
  message.flags = [];
  while (args[0] && args[0][0] === "-") {
    message.flags.push(args.shift().slice(1));
  }
  // If the command exists, **AND** the user has permission, run it.
  client.logger.cmd(`[CMD] ${client.config.permLevels.find(l => l.level === level).name} ${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`);
  cmd.run(client, message, args, level);
};
