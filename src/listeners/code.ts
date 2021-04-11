import { CommandoClient } from 'discord.js-commando'

import CodeState from '../state/code'

const events = [
  {
    event: 'ready',
    handler: (client:CommandoClient) => {
      // setup our supported languages.
      CodeState.setupLanguages();
    }
  }
]

export default events;