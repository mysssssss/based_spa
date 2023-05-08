import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'redaxios';

function BookingInfo() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [formError, setFormError] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');
  const navigate = useNavigate();
  const selectedDateTime = localStorage.getItem('selectedDateTime');
  // console.log(selectedDateTime);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !email || !phone) {
      setFormError('Please fill out all required fields.');
      setTimeout(() => {
        setFormError('');
      }, 4000);
      return;
    }
    const courseId = localStorage.getItem('courseId');
    const courseType = localStorage.getItem('courseType');

    // function formatSelectedDateTime(selectedDateTime) {
    function formatSelectedDateTime(selectedDateTime) {
      const { date, time } = JSON.parse(selectedDateTime);
      const formattedDate = date + ',' + time;
      console.log(formattedDate);
    }
    formatSelectedDateTime(selectedDateTime);
    // const formattedDate = new Date(date).toLocaleDateString(undefined, {
    // month: 'numeric',
    // day: 'numeric',
    // });
    // const formattedTime = time;
    // return `${formattedDate}, ${formattedTime}`;
    // }
    // const formattedSelectedDateTime = formatSelectedDateTime(selectedDateTime);
    // handle form submission here
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    const sendData = {
      name: name,
      email: email,
      phone: phone,
      specialRequest: specialRequest,
      courseType: courseType,
      selectedDateTime: selectedDateTime,
      courseId: courseId,
    };
    console.log(sendData);
    axios
      .post('/api/v1/booking', {
        name: name,
        email: email,
        phone: phone,
        specialRequest: specialRequest,
        courseType: courseType,
        selectedDateTime: selectedDateTime,
        courseId: courseId,
      })
      .then(() => {
        navigate('/booking_confirmation');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="form-container">
      <h2 className="addCourseH2">Contact Info</h2>
      {formError && <div className="error">{formError}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            className="addInput"
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            className="addInput"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            className="addInput"
            type="tel"
            id="phone"
            name="phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="special-request">Special Requests:</label>
          <textarea
            id="special-request"
            name="special-request"
            value={specialRequest}
            onChange={(event) => setSpecialRequest(event.target.value)}
          />
        </div>
        <button className="addCourseSubmit" type="submit">
          Submit
        </button>
      </form>
      <div className="form-error"></div>
    </div>
  );
}

export default BookingInfo;
