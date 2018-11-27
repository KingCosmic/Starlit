
const fortunes = [
  "Yes",
  "No Baka!",
  "Maybe",
  "How would i know?",
];


module.exports.run = (client, message, args) => {
  if (!args[0]) return message.channel.send(":x: " + "| Please Enter A Question You Would Like Answered")

  if (args[0]) {
    message.channel.send(fortunes.random());
  } else {
    message.channel.send(":x: " + "| I Wasnt Able To Read That :(");
  }
}

module.exports.help = {
  name: "8ball"
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "8ball",
  category: "Miscelaneous",
  description: "Ask Starlit a question!",
  usage: "8ball should I do this?"
};
