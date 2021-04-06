import { ClientCredentialsAuthProvider } from 'twitch-auth'
import { ApiClient } from 'twitch'

import axios from 'axios'

import BotConfig from './config'

const authProvider = new ClientCredentialsAuthProvider(
  process.env.TWITCH_CLIENT_ID,
  process.env.TWITCH_CLIENT_SECRET
)

export const api = new ApiClient({ authProvider })

interface ApiConfig {
  client_id:string,
  client_secret:string,
  twitch_secret:string,
  auth_token:string,
  base_url:string
}

class TwitchApi {
  public client_id:string;
  public client_secret:string;
  public twitch_secret:string;
  public auth_token:string;

  public base_url:string;

  constructor(config:ApiConfig) {
    this.client_id = config.client_id;
    this.client_secret = config.client_secret;

    this.twitch_secret = config.twitch_secret;
    this.auth_token = config.auth_token;

    this.base_url = config.base_url;
  }

  public getSubscriptions() {
    return axios({
      method: 'GET',
      url: 'https://api.twitch.tv/helix/eventsub/subscriptions',
      headers: {
        'Client-ID': this.client_id,
        'Authorization': `Bearer ${this.auth_token}`,
        'Content-Type': 'application/json'
      }
    });
  }

  public setupSubscription(user_id:string) {
    return axios({
      method: 'POST',
      url: 'https://api.twitch.tv/helix/eventsub/subscriptions',
      data: {
        "type": "stream.online",
        "version": "1",
        "condition": {
          "broadcaster_user_id": user_id
        },
        "transport": {
          "method": "webhook",
          "callback": `${this.base_url}/twitch/webhook`,
          "secret": this.twitch_secret
        }
      },
      headers: {
        'Client-ID': this.client_id,
        'Authorization': `Bearer ${this.auth_token}`,
        'Content-Type': 'application/json'
      }
    });
  }
}

export default new TwitchApi({
  client_id: process.env.TWITCH_CLIENT_ID,
  client_secret: process.env.TWITCH_CLIENT_SECRET,
  twitch_secret: process.env.TWITCH_SECRET,
  auth_token: process.env.TWITCH_AUTH_TOKEN,
  base_url: BotConfig.baseUrl
})