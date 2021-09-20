import { entersState, joinVoiceChannel, VoiceConnectionStatus } from '@discordjs/voice'
import { CommandInteraction, GuildMember } from 'discord.js'

import { MusicSubscription } from '../../subscription'

import State from '../../State'

import { BaseCommand } from '../../types'

class Command extends BaseCommand {
  name = 'join'
  description = 'force the bot to join a vc.'

  async execute(msg:CommandInteraction, args:any) {
    await msg.deferReply()

    let sub = State.subscriptions.get(msg.guildId || '')

    // If a connection to the guild doesn't already exist and the user is in a voice channel, join that channel
		// and create a subscription.
    if (!sub && (msg.member instanceof GuildMember && msg.member.voice.channel)) {
      const channel = msg.member.voice.channel

      sub = new MusicSubscription(
        joinVoiceChannel({
          channelId: channel.id,
          guildId: channel.guild.id,
          adapterCreator: channel.guild.voiceAdapterCreator
        })
      )

      sub.voiceConnection.on('error', console.warn)
      State.subscriptions.set(msg.guildId || '', sub)
    }

    // If there is no subscription, tell the user they need to join a channel.
		if (!sub) {
			return await msg.followUp('Join a voice channel and then try that again!')
		}

		// Make sure the connection is ready before processing the user's request
		try {
			await entersState(sub.voiceConnection, VoiceConnectionStatus.Ready, 20e3)
		} catch (error) {
			console.warn(error)
			return await msg.followUp('Failed to join voice channel within 20 seconds, please try again later!')
		}

    // if we made it here we we joined the voice channel succesfully
    await msg.followUp('I\'ve joined your vc.')
  }
}

export default new Command()