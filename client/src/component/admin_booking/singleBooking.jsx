import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'redaxios';

import { Link } from 'react-router-dom';

function SingleBookingInfo() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    courseType: '',
    courseId: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const bookingId = localStorage.getItem('bookingId');

  useEffect(() => {
    axios
      .get(`/api/v1/booking/${bookingId}`)
      .then((response) => {
        console.log(response.data);
        const { booking } = response.data;
        const {
          name,
          email,
          phone,
          courseType,
          courseId,
          selectedDateTime,
          _id,
        } = booking;
        setBookingData({
          name,
          email,
          phone,
          courseType,
          courseId,
          selectedDateTime,
          _id,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  function deleteCourse(bookingId) {
    axios
      .delete(`/api/v1/booking/${bookingId}`)
      .then((response) => {
        // Handle successful response
        console.log('Course deleted successfully');
        window.location.href = '/admin/bookings/all';
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
    // localStorage.setItem('courseId', courseId);
    // const courseId  // Replace with the actual course ID
    deleteCourse(courseId);
  }

  const handleEdit = (event, courseId) => {
    event.preventDefault();
    localStorage.setItem('courseId', courseId);
    const storedCourseId = localStorage.getItem('bookingId');
    window.location.href = `${storedCourseId}`;
  };

  return (
    <div className="singleBookingContainerOne">
      <div className="bookingCardOne">
        <p className="bookingNameOne">Name: {bookingData.name}</p>
        <p className="bookingPhoneOne">Email: {bookingData.email}</p>
        <p className="bookingEmailOne">Phone: {bookingData.phone}</p>
        <p className="bookingSelectedDateTimeOne">
          {bookingData.selectedDateTime}
        </p>
        <p className="bookingCourseTypeOne">
          Course Type: {bookingData.courseType}
        </p>
        <p className="bookingCourseIdOne">Course ID: {bookingData.courseId}</p>
        <div className="bookingEditDelete">
          <button
            className="deleteBooking"
            onClick={() => handleDelete(bookingData._id)}
          >
            delete booking
          </button>
          {showConfirmation === bookingData._id && (
            <div className="confirmationPopup">
              <p>Are you sure you want to delete this booking?</p>

              <button
                className="deleteNoBooking"
                onClick={() => setShowConfirmation(false)}
              >
                No
              </button>
              <button
                className="deleteYesBooking"
                onClick={(event) => handleConfirmDelete(event, bookingData._id)}
              >
                Yes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleBookingInfo;
