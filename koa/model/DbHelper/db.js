const MongoDb = require('mongodb');

const MongoClient = MongoDb.MongoClient;

const config = require('./config.js');

const ObjectID = MongoDb.ObjectID;
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
    // console.log(111)
  }

  static async connect() {
    //连接数据库
    try {
      return await MongoClient.connect(config.dbUrl, {
        useNewUrlParser: true
      });
    } catch (error) {}

  }

  static async find(collectionName, json) {
    let client = await this.getInstance();
    return await client.collection(collectionName).find(json).toArray();
  }

  static async findOne(collectionName, json) {
    let client = await Db.getInstance();
    return await client.collection(collectionName).findOne(json);
  }

  static async insertOne(collectionName, json) {
    let client = await Db.getInstance();
    return client.collection(collectionName).insertOne(json);
  }

  static async update(collectionName, filter, json) {
    let client = await Db.getInstance();
    return client.collection(collectionName).updateOne(filter, {
      $set: json
    });
  }

  static async deleteOne(collectionName, json) {
    let client = await Db.getInstance();
    return client.collection(collectionName).deleteOne(json);
  }

  static async deleteMany(collectionName, json) {
    let client = await Db.getInstance();
    return client.collection(collectionName).deleteMany(json);
  }

  static getObjectId(id) {
    return new ObjectID(id)
  }
}

module.exports = Db;