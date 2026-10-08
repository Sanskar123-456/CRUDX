const Record = require('../models/Record');

exports.getRecords = async (req, res) => {
  try {
    const records = await Record.find().sort({ createdAt: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch records.', error: err.message });
  }
};

exports.getRecordById = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    if (!record) return res.status(404).json({ message: 'Record not found.' });
    res.json(record);
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch record.', error: err.message });
  }
};

exports.createRecord = async (req, res) => {
  try {
    const { name, age, gender, language, qualifications } = req.body;
    if (!name || !age || !gender || !language || !qualifications || qualifications.length === 0) {
      return res.status(400).json({ message: 'All fields are required, including at least one qualification.' });
    }
    const record = await Record.create({ name, age, gender, language, qualifications });
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ message: 'Could not create record.', error: err.message });
  }
};

exports.updateRecord = async (req, res) => {
  try {
    const { name, age, gender, language, qualifications } = req.body;
    const record = await Record.findByIdAndUpdate(
      req.params.id,
      { name, age, gender, language, qualifications },
      { new: true, runValidators: true }
    );
    if (!record) return res.status(404).json({ message: 'Record not found.' });
    res.json(record);
  } catch (err) {
    res.status(400).json({ message: 'Could not update record.', error: err.message });
  }
};

exports.deleteRecord = async (req, res) => {
  try {
    const record = await Record.findByIdAndDelete(req.params.id);
    if (!record) return res.status(404).json({ message: 'Record not found.' });
    res.json({ message: 'Record deleted.', id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: 'Could not delete record.', error: err.message });
  }
};