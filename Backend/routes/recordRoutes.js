const express = require('express');
const router = express.Router();
const {
  getRecords,
  getRecordById,
  createRecord,
  updateRecord,
  deleteRecord
} = require('../controllers/recordController');

router.get('/', getRecords);
router.get('/:id', getRecordById);
router.post('/', createRecord);
router.put('/:id', updateRecord);
router.delete('/:id', deleteRecord);

module.exports = router;