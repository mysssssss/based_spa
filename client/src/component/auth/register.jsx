import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegistrationForm() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !email || !password) {
      setFormError('Please fill out all required fields.');
      setTimeout(() => {
        setFormError('');
      }, 4000);
      return;
    }

    // Send the form data to the server using Axios
    axios
      .post('/api/v1/auth/register', {
        name: name,
        email: email,
        password: password,
      })
      .then((response) => {
        console.log('Registration successful:', response.data);
        const token = localStorage.getItem('token');

        if (token) {
          return navigate('/admin/dashboard');
        } else {
          return navigate('/admin/register');
        }
      })
      .catch((error) => {
        console.error('Registration failed:', error.response.status);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="name"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <br />
        <button type="submit">Register</button>
        <p className="alreadyRegistered">Already have an account?</p>{' '}
        <a href="/admin/login">login here</a>
      </form>
      {formError && <div className="error">{formError}</div>}
    </div>
  );
}

export default RegistrationForm;

// Additionally, you may need to configure Axios to use the correct base URL for your server.
//  You can do this by calling axios.defaults.baseURL = "http://example.com" before making any
// requests, or by passing a  baseURL option to the axios.create() method if you're using a
// custom Axios instance.
