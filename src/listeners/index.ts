import { CommandoClient } from 'discord.js-commando'

import callbacks from '../state/listeners'

import twitchListeners from './twitchbot';

const groups = [
  twitchListeners
]

// This method takes our client and
// setups the events and listeners for our plugins.`
const setupListeners = (client:CommandoClient) => {

  // loop through our groups
  // a group can have multiple listeners
  for (let g = 0; g < groups.length; g++) {
    // grab the listeners of this group.
    const listeners = groups[g];
    
    // now lets loop through the listeners of that group.
    for (let l = 0; l < listeners.length; l++) {
      // grab the listener.
      const listener = listeners[l];

      // if we have a callback for this event it's already setup.
      // a client event so we just add it to the array
      var cbs = callbacks.get(listener.event);
      if (cbs) {
        // add our callback to the array of them.
        cbs.push(listener.callback);

        // save it back to the map.
        callbacks.set(listener.event, cbs)
      } else {

        // if we dont have a callback setup we should setup the client event for it.
        // and the callbacks array aswell.
        callbacks.set(listener.event, [listener.callback]);

        // this is our callback for the event
        // @ts-ignore
        client.on(listener.event, (...args) => {
          // grab the callbacks for this event
          const cbs = callbacks.get(listener.event);

          // loop through them
          for (let c = 0; c < cbs.length; c++) {
            // call them with our client and the args we get.
            cbs[c](client, ...args);
          }
        });
      }
    }
  }
};

export default setupListeners