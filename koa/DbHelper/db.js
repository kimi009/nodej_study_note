const MongoClient = require('mongodb').MongoClient;

const config = require('./config.js');

class Db {

  static async getInstance() {
    if (!Db.instance) {
      let client = await this.connect();
      Db.instance = client.db(config.dbName);
    }
    return Db.instance;
  }

  constructor() {

  }

  static async connect() {
    //连接数据库
    try {
      return await MongoClient.connect(config.dbUrl, {
        useNewUrlParser: true
      });
    } catch (err) {
      //报错
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

async function test() {
  console.time('start')
  await Db.find('user', {})
  console.timeEnd('start')

  console.time('start1')
  await Db.find('user', {})
  console.timeEnd('start1')
}
test();