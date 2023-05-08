import React, { useState } from 'react';
import axios from 'redaxios';
// axios.defaults.baseURL = 'http://localhost:5000';

function AddCourseForm() {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [formError, setFormError] = useState('');
  const [courseType, setCourseType] = useState('');
  const [error, setError] = useState('');

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
      axios.post('/api/v1/courses', {
        name: name,
        duration: duration,
        price: price,
        description: description,
        courseType: courseType,
      });
      setName('');
      setDuration('');
      setPrice('');
      setDescription('');
      setCourseType('');
    }
  };
  return (
    <div className="form-container">
      <h2 className="addcourseH2">Add a new course</h2>
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
            className="dropdown"
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

export default AddCourseForm;
