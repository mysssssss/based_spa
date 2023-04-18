import React, { useState } from 'react';
import axios from 'redaxios';
import { useNavigate } from 'react-router-dom';
// axios.defaults.baseURL = 'http://localhost:5000';

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !password) {
      setFormError('Please fill out all required fields.');
      setTimeout(() => {
        setFormError('');
      }, 4000);
      return;
    }

    // Send the form data to the server using Axios
    axios
      .post('/api/v1/auth/login', {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log('login successful:', response.data);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('name', response.data.user.name);
        const token = localStorage.getItem('token');

        if (token) {
          return navigate('/admin/dashboard');
        } else {
          return navigate('/login');
        }
      })
      .catch((error) => {
        console.error('login failed:', error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="login-form">
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
        <button type="submit">login</button>
        <br></br>
        <p className="alreadyRegistered">Don't have an account?</p>{' '}
        <a href="/admin/register">register here</a>
      </form>
      {formError && <div className="error">{formError}</div>}
    </div>
  );
}

export default LoginForm;

// Additionally, you may need to configure Axios to use the correct base URL for your server.
//  You can do this by calling axios.defaults.baseURL = "http://example.com" before making any
// requests, or by passing a  baseURL option to the axios.create() method if you're using a
// custom Axios instance.
