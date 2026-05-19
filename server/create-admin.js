const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModel');

const dns = require('dns');

// FORCE GOOGLE DNS
dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    
    const adminExists = await User.findOne({ email: 'admin@aura.com' });
    if (adminExists) {
      console.log('Admin already exists!');
      process.exit();
    }

    await User.create({
      name: 'AUra Admin',
      email: 'admin@aura.com',
      password: 'Admin12345',
      role: 'admin'
    });

    console.log('✅ Admin user created successfully!');
    process.exit();
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();
