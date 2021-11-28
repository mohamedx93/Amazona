import mongoose from 'mongoose';
import dotenv from 'dotenv';

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

const db = { connect, disconnect };

export default db;
