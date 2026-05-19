const mongoose = require('mongoose');

const courseSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    introVideo: String,
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Expert'],
      default: 'Beginner',
    },
    duration: String, // e.g. "12 Hours"
    language: {
      type: String,
      default: 'English',
    },
    discountPrice: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
    lessons: [
      {
        title: String,
        videoUrl: String,
        pdfUrl: String,
        duration: String,
        isFreePreview: {
          type: Boolean,
          default: false,
        },
      },
    ],
    quizzes: [
      {
        question: String,
        options: [String],
        correctAnswer: Number,
      },
    ],
    assignments: [
      {
        title: String,
        description: String,
        fileUrl: String,
      },
    ],
    studentsEnrolled: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    isApproved: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
