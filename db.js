const { MongoClient } = require('mongodb')

class Database {
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
  connect() {
    return new Promise(resolve => {
      this.client.connect().then(() => {
        this.LED = this.client.db(this.dbName).collection('live_event_data')

        resolve(true);
      }, console.error)
    })
  }
}

module.exports = new Database();