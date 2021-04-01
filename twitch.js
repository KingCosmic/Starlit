const { ClientCredentialsAuthProvider } = require('twitch-auth');
const { ApiClient } = require('twitch');

const authProvider = new ClientCredentialsAuthProvider(
  process.env.TWITCH_CLIENT_ID,
  process.env.TWITCH_CLIENT_SECRET
);

const api = new ApiClient({ authProvider });

module.exports = {
  api
}