const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  experience: [String],
  education: [String],
  projects: [String],
  skills: [String],
  references: [String]
}, { _id: false });

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  displayName: String,
  email: String,
  phoneNumber: String,
  currentLocation: String,
  openToNewOpportunities: Boolean,
  profileIsPublic: Boolean,
  theme_name: String,
  profile: profileSchema
});

module.exports = mongoose.model('User', userSchema);
