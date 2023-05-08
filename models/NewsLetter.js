const mongoose = require('mongoose');

const Newsletter = new mongoose.Schema({
  name: {
    required: [true, 'must provide a name'],
    type: String,
  },
  email: {
    required: [true, 'must provide an email'],
    type: String,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'please prove valid email',
    ],
    unique: true,
  },
});

module.exports = mongoose.model('Newsletter', Newsletter);
