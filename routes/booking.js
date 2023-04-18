const express = require('express');
const router = express.Router();

const {
  makeAppointment,
  getAllAppointments,
  getSingleAppointment,
  deleteAppointment,
  updateAppointment,
} = require('../controllers/booking');

router.post('/', makeAppointment);
router.get('/', getAllAppointments);
router.get('/:id', getSingleAppointment);
router.delete('/:id', deleteAppointment);
router.patch('/:id', updateAppointment);

module.exports = router;
