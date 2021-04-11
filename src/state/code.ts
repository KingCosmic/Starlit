import axios, { AxiosResponse } from 'axios'

interface VersionsRes {
  name:string,
  version:string,
  aliases:string[]
}

export interface RanRes {
  ran:boolean,
  language:string,
  version:string,
  output:string,
  stdout:string,
  stderr:string
}

interface Language {
  name:string,
  version:string
}

class CodeState {
  public base_url:string = ''

  public languages:Map<string, Language> = new Map();

  constructor() {}

  public hasLanguage(l:string) {
    return this.languages.has(l);
  }

  public async setupLanguages() {
    // grab the languages this api supports.
    const res = await axios({
      method: 'GET',
      url: `${this.base_url}/versions`
    }) as AxiosResponse<VersionsRes[]>;

    // grab the data
    const { data } = res;

    // save it.
    data.forEach(d => {
      d.aliases.forEach(alias => {
        this.languages.set(alias, { name: d.name, version: d.version });
      })
    })

    console.log('languages setup.');
  }

  public async executeCode(language:string, code:string) {
    // send our request
    const res = await axios({
      method: 'POST',
      url: `${this.base_url}/execute`,
      data: {
        language,
        source: code
      }
    }) as AxiosResponse<RanRes>;

    const { data } = res;

    console.log(data);
  }
}

export default new CodeState();