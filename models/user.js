const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return /https?:\/\/(w{3}.)?[\w\d._~:/?%#[\]@!\$&'\(\)\*\+,;=-]*/gi.test(link);
      },
      message: 'must be a link',
    },
  },
});

module.exports = mongoose.model('User', userSchema);