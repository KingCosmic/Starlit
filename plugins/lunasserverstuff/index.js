
exports.commands = [
  require('./commands/guidemessage'),
  require('./commands/messageage'),
  require('./commands/messagebanner'),
  require('./commands/messagecupcakerole'),
  require('./commands/messageemote'),
  require('./commands/messagegender'),
  require('./commands/messagementionroles'),
  require('./commands/messagenation'),
  require('./commands/messageserverinfo'),
  require('./commands/messageshopmessage'),
  require('./commands/messagewarningroles'),
]

exports.events = {
  'guildMemberAdd': require('./events/guildMemberAdd')
}

// Currently a unused variable will add things to it
// in the future
exports.config = {

}