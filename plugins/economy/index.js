

exports.commands = [
  require('./commands/daily'),
  require('./commands/balance'),
  require('./commands/leaderboard'),
  require('./commands/points'),
  require('./commands/give'),
  require('./commands/purchase')
]

exports.events = {
  'message': require('./events/message')
}

// Currently a unused variable will add things to it
// in the future
exports.config = {

}