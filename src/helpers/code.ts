import axios, { AxiosResponse } from 'axios';
import { Util } from 'discord.js';
import { CommandoMessage } from 'discord.js-commando'

import CodeState, { RanRes } from '../state/code'

import config from '../config'

export function parseCodeblock(message:CommandoMessage) {
  if (message.content.match(/```/g).length != 2) {
    message.say('Invalid command format (missing codeblock?)');
    return
  }


  let regex = new RegExp(`${config.prefix}(?:edit_last_)?run(?: +(\\S*)\\s*|\\s*)(?:\\n((?:[^\\n\\r\\f\\v]*\\n)*?)\\s*|\\s*)\`\`\`(?:(\\S+)\n\\s*|\\s*)([\\s\\S]*)\`\`\`(?:\\n?((?:[^\\n\\r\\f\\v]\\n?)+)+|)`)

  const match = message.content.match(regex);

  console.log(match)
  if (!match) {
    message.say('Invalid command format');
    return
  }

  let { language, args, syntax, source, stdin } = match.groups

  if (!language) language = syntax;

  if (CodeState.hasLanguage(language)) {
    message.say(`Unsupported language: **${language}**`);
    return
  }

  return { language, source, args, stdin }
}

export async function runCode(message:CommandoMessage) {
  const parsed = parseCodeblock(message);

  if (parsed === undefined) return 'nothing parsed?';

  let { language, source, args, stdin } = parsed;


  // add boilerplate code to supported languages.
  source = addBoilerplate(language, source);

  // resolve aliases for language
  language = CodeState.languages.get(language).name;

  // split args at newlines
  if (args)
    // @ts-ignore
    args = args.trimLeft().trimRight().split('\n');

  const res = await axios({
    method: 'post',
    data: {
      language,
      source,
      args,
      stdin
    }
  }) as AxiosResponse<RanRes>

  const { data } = res;

  // return early if no output was recieved
  if (!data.output) return 'no output.'

  // limit output to 30 lines maximum
  let output = data.output.split('\n').slice(0, 29).join('\n');

  // remove mentions from the output.
  output = Util.removeMentions(output);

  // Prevent code block escaping by adding zero width spaces to backticks
  output = output.replace('`', '`\u200b');

  let introduction = '';
  if (data.stdout.length === 0 && data.stderr.length > 0) {
    introduction = `${message.author} I only recieved error output.\n`
  } else {
    introduction = `Here is your output ${message.author}.\n`
  }

  const truncateIndicator = '[...]';

  const codeblock_length = 7; // 3 backticks + newline + 3 backticks
  let availableChars = 2000 - introduction.length - codeblock_length;
  if (output.length > availableChars) {
    output = `${output.slice(availableChars - truncateIndicator.length)} ${truncateIndicator}`
  }

  return (
    introduction
    + '```\n'
    + output
    + '```'
  )
}

function addBoilerplate(language:string, source:string) {
  if (language == 'java') {
    return javaBoilerplate(source)
  } else if (language == 'scala') {
    return scalaBoilerplate(source)
  } else if (language == 'rust') {
    return rustBoilerplate(source)
  } else if (language == 'c' || language == 'cpp') {
    return cppBoilerplate(source)
  } else if (language == 'go') {
    return goBoilerplate(source)
  } else if (language == 'csharp') {
    return csharpBoilerplate(source)
  }

  return source
}

function goBoilerplate(source:string) {
  if (source.includes('main')) return source

  let p = ['package main']
  let imports = []
  let code = ['func main() {']

  let lines = source.split('\n')
  lines.forEach(line => {
    if (line.trimLeft().startsWith('import')) {
      imports.push(line)
    } else {
      code.push(line)
    }
  })

  code.push('}')
  return [...p, ...imports, ...code].join('\n');
}

function cppBoilerplate(source:string) {
  if (source.includes('main')) return source;

  let imports = []
  let code = ['int main() {']

  let lines = source.replace(';', ';\n').split('\n')
  lines.forEach(line => {
    if (line.trimLeft().startsWith('#include')) {
      imports.push(line);
    } else {
      code.push(line)
    }
  })

  code.push('}')
  return [...imports, ...code].join('\n')
}

function csharpBoilerplate(source:string) {
  if (source.includes('static void Main')) return source;

  let imports=[]
  let code = ['class Program{static void Main(string[] args){']

  let lines = source.replace(';', ';\n').split('\n')
  lines.forEach(line => {
    if (line.trimLeft().startsWith('using')) {
      imports.push(line)
    } else {
      code.push(line)
    }
  })

  code.push('}}')
  return [...imports, ...code].join('\n')
}

function javaBoilerplate(source:string) {
  if (source.includes('class')) return source;

  let imports = []
  let code = ['public class temp extends Object {public static void main(String[] args) {']

  let lines = source.replace(';', ';\n').split('\n')
  lines.forEach(line => {
    if (line.trimLeft().startsWith('import')) {
      imports.push(line)
    } else {
      code.push(line)
    }
  })

  code.push('}}')
  return [...imports, ...code].join('\n')
}

function scalaBoilerplate(source:string) {
  if ([
    'extends App',
    'def main',
    '@main def',
    '@main() def'
  ].find(test => source.includes(test))) return source;


  // Scala will complain about indentation so just indent source
  let indented_source = '  ' + source.replace('\n', '\n  ').trimRight() + '\n'

  return `@main def run(): Unit = {{\n{${indented_source}}}}\n`
}

function rustBoilerplate(source:string) {
  if (source.includes('fn main')) return source;

  let imports = []
  let code = ['fn main() {']

  let lines = source.replace(';', ';\n').split('\n')
  lines.forEach(line => {
    if (line.trimLeft().startsWith('use')) {
      imports.push(line)
    } else {
      code.push(line)
    }
  })

  code.push('}')
  return [...imports, ...code].join('\n')
}