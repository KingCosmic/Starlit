import { CommandoClient } from 'discord.js-commando'

/**
 * This is our state class for the whole app
 * (discord bot and express)
 * it's used specifically for passing around
 * variables multiple parts need (like our discord client)
 * actuall state data is most likely held in a database
 */
class State {
  public client:CommandoClient;
}

export default new State();