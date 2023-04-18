const express = require('express');
const router = express.Router();

const {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  getSingleCourse,
} = require('../controllers/courses');

router.get('/', getAllCourses);
router.post('/', createCourse);

router
  .route('/:id')
  .get(getSingleCourse)
  .delete(deleteCourse)
  .patch(updateCourse);
module.exports = router;
