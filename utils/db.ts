import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { ProductDocLean, ProductObj } from './Interfaces';

dotenv.config({});

const connection = {
  isConnected: 0,
};

async function connect() {
  if (connection.isConnected) {
    console.log('already connected!');
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log('use previous connection');
      return;
    }
    await mongoose.disconnect();
  }
  mongoose
    .connect(process.env.MONGODB_URL || '')
    .then((res) => {
      console.log('new connection is established');
      connection.isConnected = mongoose.connections[0].readyState;
    })
    .catch((error) => console.log('mongo db connection err:', error));
}

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();
      connection.isConnected = 0;
    } else {
      console.log('not disconnected');
    }
  }
}

function convertDocToObj(doc: ProductDocLean): ProductObj {
  if (doc) {
    return {
      ...doc,
      _id: doc._id.toString(),
      createdAt: doc.createdAt.toString(),
      updatedAt: doc.updatedAt.toString(),
    };
  }
  return doc;
}

const db = { connect, disconnect, convertDocToObj };
export default db;
