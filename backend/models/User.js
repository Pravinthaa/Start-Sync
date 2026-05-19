const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  role: { type: String, enum: ['Founder', 'Collaborator', 'Admin'], required: true },
  avatar: { type: String },
  bio: { type: String },
  location: { type: String },
  
  // Founder Specific
  linkedin: { type: String },
  startupInterests: [{ type: String }],
  
  // Collaborator Specific
  skills: [{ type: String }],
  education: { type: String },
  experience: { type: String },
  github: { type: String },
  portfolio: { type: String },
  resume: { type: String },
  availability: { type: String },
  preferredDomains: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
