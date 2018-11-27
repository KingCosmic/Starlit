
exports.commands = [
  require('./commands/ban'),
  require('./commands/kick'),
  require('./commands/clear'),
  require('./commands/mute'),
  require('./commands/warnings')
]

// even though this is empty
// still need it defined
// (I didn't add many failsafes in the modified loader)
exports.events = {
  'message': require('./events/message')
}

// Currently a unused variable will add things to it
// in the future
exports.config = {

}