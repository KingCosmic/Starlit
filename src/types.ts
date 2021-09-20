import { SlashCommandSubcommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'

export class BaseCommand {
  name:string = ''
  description:string = ''

  execute(msg:CommandInteraction, args:any) {}

  setInfo(builder:SlashCommandSubcommandBuilder) {
    return builder.setName(this.name).setDescription(this.description)
  }
}