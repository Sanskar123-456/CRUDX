const mongoose = require('mongoose');

const qualificationSchema = new mongoose.Schema(
  {
    qualification: { type: String, required: true },
    year: { type: String, required: true },
    marks: { type: Number, required: true }
  },
  { _id: false }
);

const recordSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
    language: { type: String, required: true },
    qualifications: {
      type: [qualificationSchema],
      validate: (v) => Array.isArray(v) && v.length > 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Record', recordSchema);