const User = require('../models/userModel');
const Course = require('../models/courseModel');
const Payment = require('../models/paymentModel');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    // Check if faculty is approved
    if (user.role === 'faculty' && user.verificationStatus !== 'approved') {
      res.status(403).json({ 
        message: `Your account is ${user.verificationStatus}. Please wait for admin approval.` 
      });
      return;
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      verificationStatus: user.verificationStatus,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  const { 
    name, 
    email, 
    password, 
    role,
    skills,
    experience,
    qualification,
    linkedinUrl,
    bio
  } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: 'User already exists' });
    return;
  }

  const user = await User.create({
    name,
    email,
    password,
    role: role || 'student',
    skills: skills ? skills.split(',').map(s => s.trim()) : [],
    experience,
    qualification,
    linkedinUrl,
    bio,
    verificationStatus: role === 'faculty' ? 'pending' : 'approved'
  });

  if (user) {
    // If faculty, don't return token (block auto-login)
    if (user.role === 'faculty') {
      res.status(201).json({
        message: 'Registration successful! Your account is pending admin approval.',
        role: user.role,
        verificationStatus: user.verificationStatus
      });
      return;
    }

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      verificationStatus: user.verificationStatus,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      skills: user.skills,
      experience: user.experience,
      qualification: user.qualification,
      bio: user.bio,
      profileImage: user.profileImage,
      verificationStatus: user.verificationStatus,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.bio = req.body.bio !== undefined ? req.body.bio : user.bio;
    user.skills = req.body.skills || user.skills;
    user.experience = req.body.experience || user.experience;
    user.qualification = req.body.qualification || user.qualification;
    user.linkedinUrl = req.body.linkedinUrl || user.linkedinUrl;
    user.portfolioUrl = req.body.portfolioUrl || user.portfolioUrl;
    user.profileImage = req.body.profileImage || user.profileImage;
    user.resumeUrl = req.body.resumeUrl || user.resumeUrl;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      bio: updatedUser.bio,
      skills: updatedUser.skills,
      experience: updatedUser.experience,
      qualification: updatedUser.qualification,
      linkedinUrl: updatedUser.linkedinUrl,
      portfolioUrl: updatedUser.portfolioUrl,
      profileImage: updatedUser.profileImage,
      resumeUrl: updatedUser.resumeUrl,
      verificationStatus: updatedUser.verificationStatus,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// @desc    Get enrolled courses
// @route   GET /api/users/my-courses
// @access  Private
const getEnrolledCourses = async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: 'enrolledCourses',
    populate: { path: 'instructor', select: 'name profileImage' }
  });

  if (user) {
    res.json(user.enrolledCourses);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};


// @desc    Get all users (Admin only) with earnings for faculty
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  try {
    console.log(`[Admin Access] Requesting user: ${req.user?._id}, Role: ${req.user?.role}`);
    const users = await User.find({}).select('-password').lean();
    
    // Calculate earnings for each faculty
    const usersWithEarnings = await Promise.all(users.map(async (user) => {
      if (user.role === 'faculty') {
        try {
          // Find all courses by this instructor
          const courses = await Course.find({ instructor: user._id });
          const courseIds = courses.map(c => c._id);
          
          // Sum payments for these courses
          const payments = await Payment.find({ 
            course: { $in: courseIds },
            paymentStatus: 'completed'
          });
          
          const totalEarnings = payments.reduce((acc, curr) => acc + curr.amount, 0);
          return { ...user, totalEarnings };
        } catch (innerError) {
          console.error(`Error calculating earnings for user ${user._id}:`, innerError);
          return { ...user, totalEarnings: 0 };
        }
      }
      return user;
    }));

    res.json(usersWithEarnings);
  } catch (error) {
    console.error('Error in getUsers:', error);
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

// @desc    Update user status (Admin only)
// @route   PUT /api/users/:id/status
// @access  Private/Admin
const updateUserStatus = async (req, res) => {
  const { status } = req.body;
  const user = await User.findById(req.params.id);

  if (user) {
    user.verificationStatus = status || user.verificationStatus;
    if (req.body.role) {
      user.role = req.body.role;
    }
    await user.save();
    res.json({ message: `User status updated to ${status}${req.body.role ? ' and role updated to ' + req.body.role : ''}` });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

module.exports = {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getEnrolledCourses,
  getUsers,
  updateUserStatus,
};
