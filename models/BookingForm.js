const mongoose = require('mongoose');

const BookingFormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must provide a name'],
    maxlength: [100, 'try to keep course name under a hundred letters'],
  },
  email: {
    type: String,
    required: [true, 'must provide an email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'please prove valid email',
    ],
    // unique: true,
  },
  phone: {
    type: Number,
    required: [true, 'must provide a phone number'],
  },
  specialRequests: {
    type: String,
    maxlength: [200, 'try to limit description to 200 characters'],
  },
  selectedDateTime: {
    type: mongoose.Schema.Types.Mixed,
    required: [true, 'must provide a course duration'],
  },
  courseId: {
    type: String,
    required: [true, 'must provide a course price'],
  },
  courseType: {
    type: String,
    required: [true, 'must provide a course type'],
  },
});

module.exports = mongoose.model('BookingForm', BookingFormSchema);
