import { useState, useEffect } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('name');
    setUsername(name);
  }, []);

  return (
    <div className="dashboard-overall">
      <h1 className="dashboard-title">
        Welcome to your dashboard, {username}!
      </h1>
      <ul className="dashboard-ul">
        <a href="/admin/bookings/all" className="dashboard-ahref">
          <div className="dashboard-container-one">
            <li className="dashboard-link">
              {' '}
              <Link to="/admin/bookings/all">view bookings</Link>{' '}
            </li>
          </div>
        </a>
        <a href="/admin/courses" className="dashboard-ahref">
          <div className="dashboard-container-two">
            <li className="dashboard-link">
              {' '}
              <Link to="/admin/courses">view courses</Link>{' '}
            </li>
          </div>
        </a>
      </ul>
    </div>
  );
};

export default Dashboard;
