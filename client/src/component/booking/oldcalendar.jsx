import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap';
import axios from 'redaxios';

const Calendar = () => {
  const courseID = localStorage.getItem('courseId');

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isDateSelected, setIsDateSelected] = useState('');
  const [isDateBooked, setIsDateBooked] = useState(false);
  const [isDisabled, setIsDisabled] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handleDateClick = (day) => {
    setSelectedDate(day);
    localStorage.setItem('daySelected', day);
  };

  const handleLinkClick = () => {
    const selectedDateTime = {
      date: selectedDate,
      time: selectedTime,
    };
    localStorage.setItem('selectedDateTime', JSON.stringify(selectedDateTime));
    setIsNavOpen(false);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleMonthChange = (step) => {
    setCurrentMonth((prevMonth) => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(prevMonth.getMonth() + step);
      return newMonth;
    });
  };

  const generateCalendar = () => {
    const calendar = [];
    const monthStart = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    const monthEnd = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    );
    const startDate = new Date(monthStart);
    startDate.setDate(startDate.getDate() - startDate.getDay());

    while (startDate <= monthEnd) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        const day = new Date(startDate);
        day.setDate(startDate.getDate() + i);
        const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
        const isToday =
          day.toDateString() === new Date().toDateString() && isCurrentMonth;
        const isSelected =
          selectedDate === day.toISOString().substring(0, 10) && isCurrentMonth;

        week.push(
          <td
            key={day.toISOString()}
            className={`day ${
              isCurrentMonth ? 'current-month' : 'other-month'
            } ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
            onClick={() => handleDateClick(day.toISOString().substring(0, 10))}
          >
            {day.getDate()}
          </td>
        );
      }
      calendar.push(<tr key={startDate.toISOString()}>{week}</tr>);
      startDate.setDate(startDate.getDate() + 7);
    }
    return calendar;
  };

  let daySelected = localStorage.getItem('daySelected');
  let allowedDates = [];
  let forbiddenDates = [];
  let allDates = [];
  let fetchDataCalled = false;

  // let daySlot = handleDateClick();
  const fetchData = async () => {
    if (!fetchDataCalled) {
      // Check if fetchData() has not been called yet
      fetchDataCalled = true;
      try {
        const response = await axios.get('/api/v1/booking').then((res) => {
          const bookedDates = res.data.bookings.map(
            (booking) => booking.selectedDateTime
          );

          // console.log(bookedDates);

          // var splitAlreadySelectedTimes = alreadySelectedTimes.split(',');
          // console.log(splitAlreadySelectedTimes);
          const keysArray = timeSlots.map((obj) => obj.key);
          // console.log(allDates);
          for (let j = 0; j < keysArray.length; j++) {
            const time = keysArray[j];
            const hour = time.replace(`${daySelected}_`, '').replace('-', ':');
            const splitDate = daySelected.split('-');
            const monthWithZero = splitDate[1];
            const monthWithoutZero = parseInt(monthWithZero, 10);
            const date = monthWithoutZero + '/' + splitDate[2];

            const formattedTime = `${date}, ${hour}`;
            allDates.push(formattedTime);
          }

          for (let i = 0; i < allDates.length; i++) {
            if (bookedDates.includes(allDates[i]) === false) {
              allowedDates = allowedDates + ' ' + allDates[i];
            } else {
              forbiddenDates.push(allDates[i]);
            }
          }
          // console.log(forbiddenDates);
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  fetchData();
  // let timeArray = [];

  let newTimeSlotKeys = [];
  const generateTimeSlots = () => {
    const timeSlots = [];
    const startDate = new Date(selectedDate);
    startDate.setHours(8, 0, 0, 0);
    const endDate = new Date(selectedDate);
    endDate.setHours(18, 0, 0, 0);

    // const result = allDates.filter((item) => !forbiddenDates.includes(item));
    while (startDate < endDate) {
      let timeSlotKeys = timeSlots.map((timeSlot) => timeSlot.key);
      let newTimeSlotKeys = [];
      let time = startDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
      //   let isDisabled = disableTimeSlots(startDate);
      for (let i = 0; i < timeSlotKeys.length; i++) {
        const newDay = daySelected.split('-');
        const updatedDate = newDay[1] + '/' + newDay[2];
        let newKey = updatedDate + ', ' + timeSlotKeys[i]; // Append daySelected to each item
        newTimeSlotKeys.push(newKey);
      }

      console.log(forbiddenDates);

      timeSlots.push(
        <button
          key={time}
          onClick={() => handleTimeSelect(time)}
          className={`time-slot ${selectedTime === time ? 'selected' : ''} `}
          disabled={isDisabled}
        >
          {time}
        </button>
      );

      startDate.setMinutes(startDate.getMinutes() + 30);
    }
    console.log(timeSlots);
    return timeSlots;
  };

  let timeSlots = generateTimeSlots();

  return (
    <div className="booking-calendar-container">
      <div className="month-header">
        <button className="month-button" onClick={() => handleMonthChange(-1)}>
          <span className="arrow left"></span>
        </button>
        <h2>
          {currentMonth.toLocaleString('default', { month: 'long' })}{' '}
          {currentMonth.getFullYear()}
        </h2>
        <button className="month-button" onClick={() => handleMonthChange(1)}>
          <span className="arrow right"></span>
        </button>
      </div>
      <table className="calendar">
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>{generateCalendar()}</tbody>
      </table>
      {/* <div className="selected-date">
        Selected date:{' '}
        {selectedDate ? new Date(selectedDate).toDateString() : 'none'}
      </div> */}
      <body>{generateTimeSlots()}</body>

      <Link
        className="calendar-continue-link"
        to={`/booking_info/${courseID}`}
        onClick={handleLinkClick}
      >
        next
      </Link>
    </div>
  );
};

export default Calendar;
