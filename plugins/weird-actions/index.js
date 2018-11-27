
exports.commands = [
  require('./commands/bite'),
  require('./commands/hug'),
  require('./commands/kiss'),
  require('./commands/pat')
]

// even though this is empty
// still need it defined
// (I didn't add many failsafes in the modified loader)
exports.events = {}

// Currently a unused variable will add things to it
// in the future
exports.config = {

}