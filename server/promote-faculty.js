const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModel');
const dns = require('dns');

dotenv.config();
dns.setServers(['8.8.8.8', '8.8.4.4']);

const promoteUser = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    const user = await User.findOne({ email: 'Faculty1@gmail.com' });
    if (user) {
      user.role = 'faculty';
      user.verificationStatus = 'approved';
      await user.save();
      console.log('User Faculty1 promoted to faculty and approved.');
    } else {
      console.log('User Faculty1 not found.');
    }
    process.exit();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

promoteUser();
