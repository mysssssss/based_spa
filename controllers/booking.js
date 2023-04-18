const BookingForm = require('../models/BookingForm');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors/index');

const makeAppointment = async (req, res) => {
  const booking = await BookingForm.create(req.body);
  res.status(201).json({ booking });
};

const getAllAppointments = async (req, res) => {
  const bookings = await BookingForm.find({});
  res.status(200).json({ bookings });
};
const getSingleAppointment = async (req, res) => {
  const { id: appointmentID } = req.params;

  const booking = await BookingForm.findById({ _id: appointmentID });
  res.status(200).json({ booking });
};

const updateAppointment = async (req, res) => {
  const { id: appointmentID } = req.params;
  const booking = await BookingForm.findByIdAndUpdate(
    { _id: appointmentID },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(201).json({ booking });
};

const deleteAppointment = async (req, res) => {
  const { id: appointmentID } = req.params;
  const course = await BookingForm.findOneAndDelete({ _id: appointmentID });
  if (!course) {
    return new BadRequestError('appointment does not exist');
  }
  res.status(201).json({ msg: 'appointment successfully deleted' });
};

module.exports = {
  makeAppointment,
  getAllAppointments,
  getSingleAppointment,
  deleteAppointment,
  updateAppointment,
};
