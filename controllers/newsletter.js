const Newsletter = require('../models/NewsLetter');
const { StatusCodes } = require('http-status-codes');

const getAllNewsletter = async (req, res) => {
  const newsletter = await Newsletter.find({});
  res.status(200).json({ newsletter });
};

const makeNewsletter = async (req, res) => {
  const newsletter = await Newsletter.create(req.body);
  res.status(200).json({ newsletter });
};

const getSingleNewsletter = async (req, res) => {
  const { id: newsletter } = req.params;

  const singleNews = await Newsletter.findById({ _id: newsletter });
  res.status(200).json({ singleNews });
};

const deleteNewsletter = async (req, res) => {
  const { id: newsletter } = req.params;
  const course = await Newsletter.findOneAndDelete({ _id: newsletter });
  res.status(201).json({ msg: 'subscription successfully deleted' });
};

module.exports = {
  getAllNewsletter,
  makeNewsletter,
  getSingleNewsletter,
  deleteNewsletter,
};
