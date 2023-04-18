import React, { useState, useEffect } from 'react';
import axios from 'redaxios';
import { Link } from 'react-router-dom';

function BookingInfo() {
  const [bookingData, setBookingData] = useState([]);

  useEffect(() => {
    axios
      .get('/api/v1/booking')
      .then((response) => {
        console.log(response.data);
        const sortedBookings = response.data.bookings.sort((a, b) => {
          const dateTimeA = new Date(a.selectedDateTime.replace(',', ''));
          const dateTimeB = new Date(b.selectedDateTime.replace(',', ''));
          return dateTimeA - dateTimeB;
        });
        setBookingData(sortedBookings);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <div className="singleBookingContainer">
        {bookingData.length > 0 ? (
          bookingData.map((booking) => (
            <div className="bookingCard">
              <Link
                to={`/admin/booking/${booking._id}`}
                key={booking._id}
                className="bookingLink"
                onClick={() => localStorage.setItem('bookingId', booking._id)}
              >
                <p className="bookingName">Name: {booking.name}</p>
                <p className="bookingPhone">Phone: {booking.phone}</p>
                <p className="bookingEmail">Email: {booking.email}</p>
                <p className="bookingSelectedDateTime">
                  Selected Date Time: {booking.selectedDateTime}
                </p>
                <p className="bookingCourseType">
                  Course Type: {booking.courseType}
                </p>
                <p className="bookingCourseType">
                  Special Request: {booking.specialRequest}
                </p>
                <p className="bookingCourseId">Course ID: {booking.courseId}</p>
              </Link>
            </div>
          ))
        ) : (
          <p>No booking data available</p>
        )}
      </div>
    </div>
  );
}

export default BookingInfo;
