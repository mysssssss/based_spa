import { useState, useEffect } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';

function AdminCourses() {
  return (
    <div className="dashboard-overall">
      <h1 className="dashboard-title">Welcome to courses</h1>
      <ul className="dashboard-ul">
        <a href="/admin/courses/add" className="dashboard-ahref">
          <div className="dashboard-container-one">
            <li className="dashboard-link">
              {' '}
              <Link to="/admin/courses/add">add courses</Link>{' '}
            </li>
          </div>
        </a>
        <a href="/admin/courses/all" className="dashboard-ahref">
          <div className="dashboard-container-two">
            <li className="dashboard-link">
              {' '}
              <Link to="/admin/courses/all">
                view, update, and delete courses
              </Link>{' '}
            </li>
          </div>
        </a>
      </ul>
    </div>
  );
}

export default AdminCourses;
