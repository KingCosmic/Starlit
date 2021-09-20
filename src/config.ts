

export interface ConfigType {
  /**
   * our bots token used to login.
   */
  token:string

  /**
   * the bots application id
   */
  appID:string

  /**
   * our development guild id to register commands.
   */
  testGuildID:string

  /**
   * are we in development mode?
   */
  isInDevelopment:boolean
}

const config:ConfigType = {
  token: '',
  appID: '',
  testGuildID: '',
  isInDevelopment: false
}

export default config