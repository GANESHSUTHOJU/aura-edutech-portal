const express = require('express');
const router = express.Router();
const { 
  authUser, 
  registerUser, 
  getUserProfile,
  updateUserProfile,
  getEnrolledCourses,
  getUsers,
  updateUserStatus
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.get('/', protect, admin, getUsers);
router.put('/:id/status', protect, admin, updateUserStatus);
router.post('/login', authUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.get('/my-courses', protect, getEnrolledCourses);

module.exports = router;
