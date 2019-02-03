const MongoClient = require('mongodb').MongoClient;

const config = require('./config.js');

class Db {
  //单例模式
  static async getInstance() {
    if (!Db.instance) {
      let client = await Db.connect();
      Db.instance = client.db(config.dbName);
      console.log('instance')
    }
    return Db.instance;
  }

  constructor() {
    console.log(111)
  }

  static async connect() {
    //连接数据库
    try {
      return await MongoClient.connect(config.dbUrl, {
        useNewUrlParser: true
      });
    } catch (error) {
    }

  }

  static async find(collectionName, json) {
    let client = await this.getInstance();
    return await client.collection(collectionName).find(json).toArray();
  }

  async findOne(collectionName, json) {
    let client = await Db.getInstance();
    return await client.collection(collectionName).findOne(json);
  }

  async insertOne(collectionName, json) {
    let client = await Db.getInstance();
    return client.collection(collectionName).insertOne(json);
  }

  update() {

  }
}

module.exports = Db;