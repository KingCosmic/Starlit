import { entersState, joinVoiceChannel, VoiceConnectionStatus } from '@discordjs/voice'
import { CommandInteraction, GuildMember } from 'discord.js'

import { MusicSubscription } from '../../subscription'

import State from '../../State'

import { BaseCommand } from '../../types'
import { Track } from '../../track'
import { SlashCommandSubcommandBuilder } from '@discordjs/builders'

class Command extends BaseCommand {
  name = 'play'
  description = 'play music in the vc'

  async execute(msg:CommandInteraction, args:any) {
    await msg.deferReply()

    let sub = State.subscriptions.get(msg.guildId || '')

    // Extract the video URL from the command
		const url = msg.options.get('song')!.value! as string;

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

    // if we made it here we canm play music
    try {
			// Attempt to create a Track from the user's video URL
			const track = await Track.from(url, {
				onStart() {
					msg.followUp({ content: 'Now playing!', ephemeral: true }).catch(console.warn)
				},
				onFinish() {
					msg.followUp({ content: 'Now finished!', ephemeral: true }).catch(console.warn)
				},
				onError(error) {
					console.warn(error)
					msg.followUp({ content: `Error: ${error.message}`, ephemeral: true }).catch(console.warn)
				}
			})

			// Enqueue the track and reply a success message to the user
			sub.enqueue(track)
			await msg.followUp(`Enqueued **${track.title}**`)
		} catch (error) {
			console.warn(error)
			await msg.reply('Failed to play track, please try again later!')
		}
  }

  setInfo(builder:SlashCommandSubcommandBuilder) {
    return builder.setName(this.name).setDescription(this.description).addStringOption(option => option.setName('song').setDescription('The URL of the song to play').setRequired(true))
  }
}

export default new Command()