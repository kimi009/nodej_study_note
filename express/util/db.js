//mongodb 数据库操作
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectID = require('mongodb').ObjectID;
var DbUrl = 'mongodb://127.0.0.1:27017/student'

const connectDb = async() => {
  try {
    return await MongoClient.connect(DbUrl, {
      useNewUrlParser: true
    });
  } catch (error) {
    assert(error.message);
    return null;
  }
}

exports.ObjectID = ObjectID;

exports.find = async(collectionName, condition) => {
  try {
    let client = await connectDb();
    if (client) {
      let res = client.db().collection(collectionName).find(condition);
      let products = await res.toArray();
      client.close();
      return products;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }

};

exports.findOne = async(collectionName, condition) => {
  let client = await connectDb();
  if (client) {
    let res = client.db().collection(collectionName).findOne(condition);
    client.close();
    return res;
  } else {
    return null;
  }
};

exports.insertAsync = async(collectionName, data) => {
  let client = await connectDb();
  if (client) {
    let coll = client.db().collection(collectionName);
    let res = await coll.insert(data);
    client.close();
    return res.result;
  }
  return 0;
}

exports.insert = async(collectionName, data, callback) => {
  let client = await connectDb();
  if (client) {
    let coll = client.db().collection(collectionName);
    let res = await coll.insert(data);
    client.close();
    callback(res.result)
  } else {
    callback(null)
  }

}



exports.updateOne = async(collectionName, target, data, callback) => {
  let client = await connectDb();
  if (client) {
    let coll = client.db().collection(collectionName);
    let res = await coll.updateOne(target, {
      $set: data,
      $currentDate: {
        lastModified: true
      }
    });
    if (callback) {
      callback(res.result);
    }
    client.close();
    return res.result;
  }
  return 0;
}

exports.deleteOne = async(collectionName, target) => {
  let client = await connectDb();
  if (client) {
    let coll = client.db().collection(collectionName);
    await coll.deleteOne(target);
  }
}