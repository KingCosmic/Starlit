require('dotenv').config()

import setupExpress from './express'
import setupClient from './client'
import State from './state/app'
import DB from './db'

import config from './config'

const init = async () => {

  // connect to our database
  await DB.connect()
  console.log('connected to database')

  const client = setupClient()

  // update our internal state.
  State.client = client;

  // create an express server.
  await setupExpress();

  // login our client.
  client.login(config.token);
}

init();