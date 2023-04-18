import React, { useState, useEffect } from 'react';
import axios from 'redaxios';
// axios.defaults.baseURL = 'http://localhost:5000';

function EditCourseForm() {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [formError, setFormError] = useState('');
  const [courseType, setCourseType] = useState('');
  const [error, setError] = useState('');

  const courseId = localStorage.getItem('courseId');
  useEffect(() => {
    axios
      .get(`/api/v1/courses/${courseId}`)
      .then((response) => {
        console.log(response.data);
        const { course } = response.data;
        const { name, description, price, duration, courseType } = course;

        setName(name);
        setDescription(description);
        setPrice(price);
        setDuration(duration);
        setCourseType(courseType);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !duration || !price || !description || !courseType) {
      setFormError('Please fill out all required fields.');
      setTimeout(() => {
        setFormError('');
      }, 4000);
      return;
    } else if (description.length < 150) {
      setError('Please describe the course in at least 150 characters');
      setTimeout(() => {
        setError('');
      }, 4000);
      return;
    } else {
      try {
        await axios.patch(`/api/v1/courses/${courseId}`, {
          name: name,
          duration: duration,
          price: price,
          description: description,
          courseType: courseType,
        });
        console.log('successfully updated');
        window.location.href = '/admin/courses/all';
      } catch (error) {
        console.error(error);
        // Handle error here
      }
    }
  };
  return (
    <div className="form-container">
      <h2 className="addcourseH2">edit the course</h2>
      {error && <div className="error"> {error}</div>}
      {formError && <div className="error">{formError}</div>}

      <form
        onSubmit={handleSubmit}
        className="addCourseForm"
        encType="multipart/form-data"
      >
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            className="addInput"
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duration:</label>
          <input
            className="addInput"
            type="text"
            id="duration"
            name="duration"
            value={duration}
            onChange={(event) => setDuration(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            className="addInput"
            type="text"
            id="price"
            name="price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            className="addInput"
            id="description"
            name="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="courseType">Course Type:</label>
          <select
            className="addInput"
            id="courseType"
            name="courseType"
            value={courseType}
            onChange={(event) => setCourseType(event.target.value)}
          >
            <option value="">Select a course type</option>
            <option value="message">Massage</option>
            <option value="facials">Facials</option>
            <option value="body treatment">Body Treatment</option>
            <option value="sauna">Sauna</option>
            <option value="packages">Packages</option>
            <option value="consultation">Consultation</option>
          </select>
        </div>

        <button className="addCourseSubmit" type="submit">
          Submit
        </button>
      </form>
      <div className="form-error"></div>
    </div>
  );
}

export default EditCourseForm;
