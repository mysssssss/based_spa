const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must provide a course name'],
    maxlength: [100, 'try to keep course name under a hundred letters'],
  },
  duration: {
    type: String,
    required: [true, 'must provide a course duration'],
  },
  price: {
    type: String,
    required: [true, 'must provide a course price'],
  },

  description: {
    type: String,
    required: [true, 'must provide course description'],
    minlength: [150, 'try to describe in at least 150 characters'],
  },
  courseType: {
    type: String,
    required: [true, 'must provide a course type'],
  },
});

module.exports = mongoose.model('Course', CourseSchema);
