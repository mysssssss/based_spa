const express = require('express');
const router = express.Router();
const {
  getAllNewsletter,
  makeNewsletter,
  getSingleNewsletter,
  deleteNewsletter,
} = require('../controllers/newsletter');

router.route('/').get(getAllNewsletter).post(makeNewsletter);
router.route('/:id').get(getSingleNewsletter).delete(deleteNewsletter);

module.exports = router;
