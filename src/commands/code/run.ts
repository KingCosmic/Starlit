import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando'
import { Message } from 'discord.js'

import { parseCodeblock, runCode } from '../../helpers/code'

interface RunArgs {
  code:string
}

class RunCommand extends Command {
  constructor(client:CommandoClient) {
    super(client, {
      name: 'run',
      aliases: ['r'],
      group: 'code',
      memberName: 'run',
      description: 'runs some code',
      args: [
        {
          key: 'code',
          prompt: 'What code would you like to run?',
          type: 'string',
        }
      ]
    });
  }

  async run(message:CommandoMessage, { code }:RunArgs):Promise<Message | Message[]> {
    let output = await runCode(message);
    return message.say(output);
  }
}

export default RunCommand