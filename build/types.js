import { SlashCommandBuilder } from '@discordjs/builders';
export class BaseCommand {
    constructor() {
        this.name = '';
        this.description = '';
    }
    execute(msg, args) { }
    getInfo() {
        return new SlashCommandBuilder().setName(this.name).setDescription(this.description);
    }
}
