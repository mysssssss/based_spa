// react
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import $ from 'jquery';

// routes
import Home from './pages/home';
import About from './pages/about';
import Login from './pages/admin/login';
import Register from './pages/admin/register';

import BookingCalendar from './pages/booking/calendar';
import Course from './pages/booking/course';
import AdminHome from './pages/admin/admin_home';
import AdminCourses from './pages/admin/courses';
import Dashboard from './pages/admin/dashboard';
import AddCourse from './pages/admin/admin_courses/addcourse';
import ViewCourses from './pages/admin/admin_courses/view_update_courses';
import BookingForm from './pages/booking/booking_info';
import ConfirmationPage from './pages/booking/confirmation';
import AdminViewBookings from './pages/admin/admin_bookings/view_all_bookings';
import ViewSingle from './pages/admin/admin_bookings/viewSingle';
import UpdateCourse from './pages/admin/admin_courses/update_course';
// components
import AdminNavbar from './component/nav/admin_navbar';
import Footer from './component/footer/footer';
import Navbar from './component/nav/navbar';

// wraps
import { PrivateRoute } from './wrapper/private_route';

// css
import './css/singlebooking.css';
import './css/login.css';
import './css/course.css';
import './css/calendar.css';
import './css/navbar.css';
import './css/frontpage.css';
import './css/dashboard.css';
import './css/admin-courses.css';
import './css/confirmation.css';
import './css/bookings.css';

import 'bootstrap';
function App() {
  return (
    <Router>
      <Routes>
        // client routes
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Navbar />
              <About />
              <Footer />
            </>
          }
        />
        <Route
          path="/booking_courses"
          element={
            <>
              <Navbar />
              <Course />
            </>
          }
        />
        <Route
          path="/booking_calendar/:id"
          element={
            <>
              <Navbar />
              <BookingCalendar />
            </>
          }
        />
        <Route
          path="/booking_info/:id"
          element={
            <>
              <Navbar />
              <BookingForm />
            </>
          }
        />
        <Route
          path="/booking_confirmation"
          element={
            <>
              <Navbar />
              <ConfirmationPage />
            </>
          }
        />
        // admin routes
        <Route
          path="/admin"
          element={
            <>
              <AdminNavbar />
              <AdminHome />
            </>
          }
        />
        <Route
          path="/admin/login"
          element={
            <>
              <AdminNavbar />
              <Login />
            </>
          }
        />
        <Route
          path="/admin/register"
          element={
            <>
              <AdminNavbar />
              <Register />
            </>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <>
                <AdminNavbar />
                <Dashboard />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/courses"
          element={
            <PrivateRoute>
              <>
                <AdminNavbar />
                <AdminCourses />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/courses/add"
          element={
            <PrivateRoute>
              <>
                <AdminNavbar />
                <AddCourse />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/courses/all"
          element={
            <PrivateRoute>
              <>
                <AdminNavbar />
                <ViewCourses />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/bookings/all"
          element={
            <PrivateRoute>
              <>
                <AdminNavbar />
                <AdminViewBookings />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/booking/:id"
          element={
            <PrivateRoute>
              <>
                <AdminNavbar />
                <ViewSingle />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/courses/:id"
          element={
            <PrivateRoute>
              <>
                <AdminNavbar />
                <UpdateCourse />
              </>
            </PrivateRoute>
          }
        />
      </Routes>

      {/* <Footer /> */}
    </Router>
  );
}

export default App;
