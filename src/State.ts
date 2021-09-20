import { Collection } from 'discord.js'

import {
  AudioPlayerStatus,
	AudioResource,
	entersState,
	joinVoiceChannel,
	VoiceConnectionStatus
} from '@discordjs/voice'

import { BaseCommand } from './types'
import { MusicSubscription } from './subscription'

class BotState {
  static commands:Collection<string, Collection<string, BaseCommand>> = new Collection()

  static subscriptions:Collection<string, MusicSubscription> = new Collection()
}

export default BotState