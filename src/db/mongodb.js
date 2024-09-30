// db/mongodb.js
const mongoose = require('mongoose');
const { MONGO_URI } = process.env;
const { MongoClient } = require('mongodb');

async function connectToDB(dbName) {
  try {
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    const database = client.db(dbName);
    return { database, client };
  } catch (error) {
    console.log('connectToDB >>> error', error);
  }
}

async function handleInfoUser(db, collectionName, user) {
  const collection = db.database.collection(collectionName);
  const email = user?.email;
  const extUser = await collection.findOne({ email: email });
  const date = new Date().toLocaleString('vi-VN');

  if (!extUser) {
    user.createdAt = date;
    await collection.insertOne(user);
    return extUser;
  } else {
    // console.log('str1 ⭐', extUser._id.toString());
    user.updatedAt = date;
    user.createdAt = extUser.createdAt;
    await collection.updateOne({ email: email }, { $set: user });
    return extUser;
  }
}

// Thêm các hàm khác cho tìm kiếm, cập nhật, xóa người dùng
module.exports = { connectToDB, handleInfoUser };
