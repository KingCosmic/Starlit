
exports.run = (client, message, args, level) => {
  const user = message.mentions.users.first()
  // Parse Amount
  const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
  if (!amount) return message.reply('Must specify an amount to delete!');
  if (!amount && !user) return message.reply('Must specify a user and amount, or just an amount, of messages to purge!');
  // Fetch 100 messages (will be filtered and lowered up to max amount requested)
  message.channel.fetchMessages({
    limit: 100,
  }).then((messages) => {
    if (user) {
      const filterBy = user ? user.id : client.user.id;
      messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
    } else {
      messages = messages.array().slice(0, amount);
    }
    message.channel.bulkDelete(messages)
    .then(() => {
      message.channel.send('The messages have been deleted')
      .then((msg) => {
        setTimeout(() => {
          msg.delete()
        }, 3000)
      });
    })
  });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Mod"
};

exports.help = {
  name: "clear",
  category: "Moderation",
  description: "clears an ammount of messages",
  usage: "clear [number of messages]"
};