const mongoose = require('mongoose');
const dns = require('dns');
const dotenv = require('dotenv');

dotenv.config();

// FORCE NODE.JS TO USE GOOGLE DNS TO BYPASS LOCAL NETWORK BLOCKS
dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectDB = async () => {
  try {
    console.log('⏳ Connecting to MongoDB (Forcing Google DNS)...');
    const conn = await mongoose.connect(process.env.DATABASE_URL);
    console.log(`🚀 MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ Connection Error:`, error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
