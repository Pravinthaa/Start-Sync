const mongoose = require('mongoose');

const startupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String },
  tagline: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  problemStatement: { type: String },
  targetAudience: { type: String },
  stage: { type: String, enum: ['Idea', 'Prototype', 'MVP', 'Launched'], required: true },
  roles: [{ type: String }],
  skills: [{ type: String }],
  workType: { type: String, enum: ['Remote', 'Hybrid', 'Onsite'], required: true },
  compensation: { type: String, enum: ['Equity', 'Paid', 'Equity + Paid', 'Unpaid', 'Internship'], required: true },
  duration: { type: String },
  location: { type: String, required: true },
  deadline: { type: Date },
  founder: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  applicationsCount: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Startup', startupSchema);
