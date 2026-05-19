const Course = require('../models/courseModel');
const User = require('../models/userModel');

// @desc    Fetch all courses
// @route   GET /api/courses
// @access  Public
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({}).populate('instructor', 'name');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single course
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructor', 'name');

    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch courses for current instructor
// @route   GET /api/courses/instructor
// @access  Private/Faculty
const getInstructorCourses = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user._id });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a course
// @route   POST /api/courses
// @access  Private/Faculty
const createCourse = async (req, res) => {
  const { 
    title, description, thumbnail, price, discountPrice, 
    isPaid, category, level, introVideo, duration, lessons 
  } = req.body;

  const course = new Course({
    title,
    description,
    thumbnail,
    price,
    discountPrice,
    isPaid,
    category,
    level,
    introVideo,
    duration,
    lessons,
    instructor: req.user._id,
  });

  const createdCourse = await course.save();
  res.status(201).json(createdCourse);
};

// @desc    Update a course
// @route   PUT /api/courses/:id
// @access  Private/Faculty
const updateCourse = async (req, res) => {
  const { 
    title, description, thumbnail, price, discountPrice, 
    isPaid, category, level, introVideo, duration, lessons 
  } = req.body;

  const course = await Course.findById(req.params.id);

  if (course) {
    if (course.instructor.toString() !== req.user._id.toString()) {
      res.status(401).json({ message: 'Not authorized to update this course' });
      return;
    }

    course.title = title || course.title;
    course.description = description || course.description;
    course.thumbnail = thumbnail || course.thumbnail;
    course.price = price || course.price;
    course.discountPrice = discountPrice || course.discountPrice;
    course.isPaid = isPaid !== undefined ? isPaid : course.isPaid;
    course.category = category || course.category;
    course.level = level || course.level;
    course.introVideo = introVideo || course.introVideo;
    course.duration = duration || course.duration;
    course.lessons = lessons || course.lessons;

    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
};

// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Private/Faculty
const deleteCourse = async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (course) {
    if (course.instructor.toString() !== req.user._id.toString()) {
      res.status(401).json({ message: 'Not authorized to delete this course' });
      return;
    }

    await course.deleteOne();
    res.json({ message: 'Course removed' });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
};

// @desc    Enroll in a course
// @route   POST /api/courses/enroll
// @access  Private
const enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const course = await Course.findById(courseId);

    if (!course) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }

    const user = await User.findById(req.user._id);

    if (user.enrolledCourses.includes(courseId)) {
      res.status(400).json({ message: 'Already enrolled in this course' });
      return;
    }

    user.enrolledCourses.push(courseId);
    await user.save();

    // Add user to course's enrolled students
    if (!course.studentsEnrolled.includes(req.user._id)) {
      course.studentsEnrolled.push(req.user._id);
      await course.save();
    }

    res.status(200).json({ message: 'Successfully enrolled' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCourses,
  getCourseById,
  getInstructorCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollCourse,
};
