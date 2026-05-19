const express = require('express');
const router = express.Router();
const {
  getCourses,
  getCourseById,
  getInstructorCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollCourse,
} = require('../controllers/courseController');
const { protect, faculty } = require('../middleware/authMiddleware');

router.route('/').get(getCourses).post(protect, faculty, createCourse);
router.route('/enroll').post(protect, enrollCourse);
router.route('/instructor').get(protect, faculty, getInstructorCourses);
router.route('/:id')
  .get(getCourseById)
  .put(protect, faculty, updateCourse)
  .delete(protect, faculty, deleteCourse);

module.exports = router;
