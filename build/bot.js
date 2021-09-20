import { Client, Intents } from 'discord.js';
import BotState from './State';
import config from './config';
function setupBot() {
    const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
    client.on('ready', () => {
        var _a;
        console.log(`Logged in as ${(_a = client.user) === null || _a === void 0 ? void 0 : _a.tag}!`);
    });
    client.on('interactionCreate', async (interaction) => {
        var _a;
        // if it isn't a command just return.
        if (!interaction.isCommand())
            return;
        const { commandName } = interaction;
        // just return out if we can't find that command.
        if (!BotState.commands.has(commandName))
            return;
        try {
            (_a = BotState.commands.get(commandName)) === null || _a === void 0 ? void 0 : _a.execute(interaction, null);
        }
        catch (error) {
            console.error(error);
            await interaction.reply('there was an error trying to execute that command!');
        }
    });
    client.login(config.token);
}
export default setupBot;
