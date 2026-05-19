const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModel');
const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);
dotenv.config();

const approveAdmin = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    
    const admin = await User.findOne({ email: 'admin@aura.com' });
    if (admin) {
      admin.verificationStatus = 'approved';
      await admin.save();
      console.log('✅ Admin account has been officially APPROVED!');
    } else {
      console.log('Admin account not found.');
    }
    process.exit();
  } catch (error) {
    console.error('Error approving admin:', error);
    process.exit(1);
  }
};

approveAdmin();
