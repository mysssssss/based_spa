import React, { useEffect, useState, useRef } from 'react';
import axios from 'redaxios';
import CourseImage from '../../assets/courses.png';
import { Link } from 'react-router-dom';

function CourseList() {
  const [courses, setCourses] = useState([]);

  const massagesRef = useRef(null);
  const facialsRef = useRef(null);
  const bodyRef = useRef(null);
  const saunaRef = useRef(null);
  const packagesRef = useRef(null);
  const consultationRef = useRef(null);
  const [showDescriptions, setShowDescriptions] = useState(false);

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
        });
        return acc;
      }, {});
      setCourses(sortedCourses);
    });
  }, []);
  const handleShortenDescription = (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    } else {
      return `${description.slice(0, maxLength)}...`;
    }
  };

  const [expandedCourse, setExpandedCourse] = useState(null);

  const handleExpandDescription = (courseId) => {
    setExpandedCourse(courseId);
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
                          {expandedCourse === course._id ? (
                            <p>{course.description}</p>
                          ) : (
                            <p>
                              {handleShortenDescription(
                                course.description,
                                100
                              )}
                              <Link
                                onClick={() =>
                                  handleExpandDescription(course._id)
                                }
                                className="readMoreLink"
                              >
                                Read More
                              </Link>
                            </p>
                          )}{' '}
                        </p>

                        <img src={CourseImage} alt="" className="courseImg" />
                      </div>
                      <Link
                        className="courseBookLink"
                        to={`/booking_calendar/${course._id}`}
                        onClick={() => {
                          localStorage.setItem('courseId', course._id);
                          localStorage.setItem('courseType', courseType);
                        }}
                      >
                        book
                      </Link>
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
