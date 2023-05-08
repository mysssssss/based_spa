import React, { useEffect, useState, useRef } from 'react';
import axios from 'redaxios';
import CourseImage from '../../assets/courses.png';
import { Link } from 'react-router-dom';

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const massagesRef = useRef(null);
  const facialsRef = useRef(null);
  const bodyRef = useRef(null);
  const saunaRef = useRef(null);
  const packagesRef = useRef(null);
  const consultationRef = useRef(null);

  useEffect(() => {
    axios.get('/api/v1/courses').then((response) => {
      const sortedCourses = response.data.courses.reduce((acc, course) => {
        const { courseType, name, duration, price, description, _id } = course;
        if (!acc[courseType.toLowerCase()]) {
          acc[courseType.toLowerCase()] = [];
        }
        acc[courseType.toLowerCase()].push({
          name,
          duration,
          price,
          description,
          _id,
          showConfirmation: false,
        });
        return acc;
      }, {});
      setCourses(sortedCourses);
    });
  }, []);

  function deleteCourse(courseId) {
    axios
      .delete(`/api/v1/courses/${courseId}`)
      .then((response) => {
        // Handle successful response
        console.log('Course deleted successfully');
        window.location.reload();
      })
      .catch((error) => {
        // Handle error
        console.error('Error deleting course:', error);
      });
  }

  const handleDelete = (courseId) => {
    setShowConfirmation(courseId);
  };

  function handleConfirmDelete(event, courseId) {
    event.preventDefault();
    localStorage.setItem('courseId', courseId);
    // const courseId  // Replace with the actual course ID
    deleteCourse(courseId);
  }

  const handleEdit = (event, courseId) => {
    event.preventDefault();
    localStorage.setItem('courseId', courseId);
    const storedCourseId = localStorage.getItem('courseId');
    window.location.href = `${storedCourseId}`;
  };

  return (
    <div>
      <div>
        <div className="top-nav">
          <nav className="top-nav-courses">
            <ul>
              <li
                onClick={() =>
                  consultationRef.current.scrollIntoView({ behavior: 'smooth' })
                }
              >
                Consultation
              </li>
              <li
                onClick={() =>
                  massagesRef.current.scrollIntoView({ behavior: 'smooth' })
                }
              >
                Massages
              </li>
              <li
                onClick={() =>
                  facialsRef.current.scrollIntoView({ behavior: 'smooth' })
                }
              >
                Facials
              </li>
              <li
                onClick={() =>
                  bodyRef.current.scrollIntoView({ behavior: 'smooth' })
                }
              >
                Body Treatments
              </li>
              <li
                onClick={() =>
                  saunaRef.current.scrollIntoView({ behavior: 'smooth' })
                }
              >
                Infrared Sauna
              </li>
              <li
                onClick={() =>
                  packagesRef.current.scrollIntoView({ behavior: 'smooth' })
                }
              >
                Packages
              </li>
            </ul>
          </nav>
        </div>
        <div className="messageOverall">
          {Object.entries(courses).map(([courseType, courseList]) => (
            <div key={courseType}>
              <div className="facials">
                <h2
                  ref={
                    courseType.toLowerCase() === 'message'
                      ? massagesRef
                      : courseType.toLowerCase() === 'facials'
                      ? facialsRef
                      : courseType.toLowerCase() === 'body treatment'
                      ? bodyRef
                      : courseType.toLowerCase() === 'sauna'
                      ? saunaRef
                      : courseType.toLowerCase() === 'packages'
                      ? packagesRef
                      : courseType.toLowerCase() === 'consultation'
                      ? consultationRef
                      : null
                  }
                >
                  {courseType}
                </h2>
                {courseList.map((course, index) => (
                  <div key={index} className="massageCourses">
                    <div className="courseSingleCard">
                      <h4>{course.name}</h4>
                      <div className="durationPrice">
                        <p className="courseDuration">
                          {course.duration} | {course.price}
                        </p>
                      </div>
                      <div className="imgDescription">
                        <p className="courseDescription">
                          {course.description}
                        </p>{' '}
                        <img src={CourseImage} alt="" className="courseImg" />
                      </div>
                      <button
                        className="deleteButton"
                        onClick={() => handleDelete(course._id)}
                      >
                        delete course
                      </button>
                      {showConfirmation === course._id && (
                        <div className="confirmationPopup">
                          <p>Are you sure you want to delete this course?</p>

                          <button
                            className="deleteNo"
                            onClick={() => setShowConfirmation(false)}
                          >
                            No
                          </button>
                          <button
                            className="deleteYes"
                            onClick={(event) =>
                              handleConfirmDelete(event, course._id)
                            }
                          >
                            Yes
                          </button>
                        </div>
                      )}
                      {/* <button
                        className="deleteButton"
                        id="deleteButton1"
                        onClick={(event) => handleClick(event, course._id)}
                      >
                        delete course
                      </button> */}

                      <button
                        className="updateButton"
                        onClick={(event) => handleEdit(event, course._id)}
                      >
                        edit course
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CourseList;
