

exports.commands = [
  require('./commands/help'),
  require('./commands/mylevel'),
  require('./commands/stats'),
  require('./commands/eval'),
  require('./commands/set')
]

// even though this is empty
// still need it defined
// (I didn't add many failsafes in the modified loader)
exports.events = {}

// Currently a unused variable will add things to it
// in the future
exports.config = {

}