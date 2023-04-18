const Course = require('../models/Course');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors/index');

const createCourse = async (req, res) => {
  const course = await Course.create(req.body);
  res.status(201).json({ course });
};
const getAllCourses = async (req, res) => {
  const courses = await Course.find({});
  res.status(200).json({ courses });
};

const getSingleCourse = async (req, res) => {
  const { id: courseID } = req.params;
  const course = await Course.findOne({ _id: courseID });
  if (!course) {
    throw new BadRequestError('course does not exist');
  }
  res.status(200).json({ course });
};

const deleteCourse = async (req, res) => {
  const { id: courseID } = req.params;
  const course = await Course.findOneAndDelete({ _id: courseID });
  if (!course) {
    return new BadRequestError('course does not exist');
  }
  res.status(201).json({ msg: 'course successfully deleted' });
};

const updateCourse = async (req, res) => {
  const { id: courseID } = req.params;
  const course = await Course.findOneAndUpdate({ _id: courseID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!course) {
    return new BadRequestError('course does not exist');
  }
  res.status(201).json({ course });
};

module.exports = {
  getAllCourses,
  getSingleCourse,
  createCourse,
  deleteCourse,
  updateCourse,
};
