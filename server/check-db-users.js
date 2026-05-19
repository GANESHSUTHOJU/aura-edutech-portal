const mongoose = require('mongoose');
const dns = require('dns');
const dotenv = require('dotenv');
const User = require('./models/userModel');

dotenv.config();
dns.setServers(['8.8.8.8', '8.8.4.4']);

const checkDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('Connected to DB');
    const users = await User.find({});
    console.log(`Found ${users.length} users:`);
    users.forEach(u => {
      console.log(`- ${u.name} (${u.email}) [${u.role}] [Status: ${u.verificationStatus}]`);
    });
    process.exit();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

checkDB();
