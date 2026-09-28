const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoMemoryServer = null;

const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fitone-gym';
    console.log(`Connecting to MongoDB at: ${connStr}`);
    
    // Set low timeout to detect if local mongo is running
    const conn = await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 3000
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.warn(`Local MongoDB connection failed: ${err.message}. Starting MongoMemoryServer in-memory fallback...`);
    try {
      mongoMemoryServer = await MongoMemoryServer.create();
      const mongoUri = mongoMemoryServer.getUri();
      const conn = await mongoose.connect(mongoUri);
      console.log(`In-Memory MongoDB Connected Successfully at: ${conn.connection.host}`);
    } catch (memErr) {
      console.error(`In-memory MongoDB Error: ${memErr.message}`);
    }
  }
};

module.exports = connectDB;
