import { ClientCredentialsAuthProvider } from 'twitch-auth'
import { ApiClient } from 'twitch'

const authProvider = new ClientCredentialsAuthProvider(
  process.env.TWITCH_CLIENT_ID,
  process.env.TWITCH_CLIENT_SECRET
)

export const api = new ApiClient({ authProvider })