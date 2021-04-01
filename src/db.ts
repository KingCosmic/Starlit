import { Collection, MongoClient } from 'mongodb'

class Database {
  public client:MongoClient;
  public dbName:string = process.env.dbName;

  public LED:Collection<any>;

  constructor() {
    this.dbName = process.env.DBNAME

    this.client = new MongoClient(process.env.DBURL, {
      useUnifiedTopology: true
    });
  }

  /**
   * connect
   * 
   * connects to our mongodb database
   */
  public connect() {
    return new Promise(resolve => {
      this.client.connect().then(() => {
        this.LED = this.client.db(this.dbName).collection('live_event_data')

        resolve(true);
      }, console.error)
    })
  }
}

export default new Database();