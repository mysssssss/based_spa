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
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handleDateClick = (day) => {
    setSelectedDate(day);
    localStorage.setItem('daySelected', day);
    updatedDates();
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
  let disableNext;
  if (selectedTime === '') {
    disableNext = true;
  }

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
  let updatedForbiddenDates = [];
  let wantedSlots = [];
  let times = [];
  let allDatesUnique = [];

  const whateverSlots = [];
  let timeSlotKeys = [];
  let timeSlots = [];
  let normalSlots = [];
  let splicedSlots = [];
  let normalSlotsUnique = [];
  let uniqueTimeSlots = [];
  const generateTimeSlots = () => {
    const startDate = new Date(selectedDate);
    startDate.setHours(8, 0, 0, 0);
    const endDate = new Date(selectedDate);
    endDate.setHours(18, 0, 0, 0);

    wantedSlots = allDatesUnique.filter(
      (item) => !forbiddenDates.includes(item)
    );

    for (let i = 0; i < wantedSlots.length; i++) {
      times.push(wantedSlots[i].split(', ')[1]);
    }
    const uniqueTimes = [...new Set(times)];

    for (let i = 0; i < uniqueTimes.length; i++) {
      wantedSlots.push(
        <button
          key={uniqueTimes[i]}
          onClick={() => handleTimeSelect(uniqueTimes[i])}
          className={`time-slot ${
            selectedTime === uniqueTimes[i] ? 'selected' : ''
          } `}
          disabled={false}
        >
          {uniqueTimes[i]}
        </button>
      );
    }
    splicedSlots = wantedSlots.splice(19);
    for (let i = 0; i < splicedSlots.length; i++) {
      whateverSlots.push(splicedSlots[i]);
    }
    let arrayTime = [];
    let time;
    while (startDate < endDate) {
      timeSlotKeys = timeSlots.map((timeSlot) => timeSlot.key);
      // let newTimeSlotKeys = [];
      time = startDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
      startDate.setMinutes(startDate.getMinutes() + 30);

      timeSlots.push(time);
    }
    uniqueTimeSlots = [...new Set(timeSlots)];

    normalSlots = uniqueTimeSlots.reduce((acc, timeSlot) => {
      if (!acc.find((slot) => slot.key === timeSlot)) {
        acc.push(
          <button
            key={timeSlot}
            onClick={() => handleTimeSelect(timeSlot)}
            className={`time-slot ${
              selectedTime === timeSlot ? 'selected' : ''
            } `}
            disabled={false}
          >
            {timeSlot}
          </button>
        );
      }
      return acc;
    }, []);

    localStorage.setItem('allSlots', timeSlots);

    return normalSlots;
  };

  generateTimeSlots();

  let what = [];
  let formattedBookedDates = [];
  let bookedDates = [];
  let bookingId = [];
  const fetchData = async () => {
    if (!fetchDataCalled) {
      // Check if fetchData() has not been called yet
      fetchDataCalled = true;

      const startDate = new Date(selectedDate);
      startDate.setHours(8, 0, 0, 0);
      const endDate = new Date(selectedDate);
      endDate.setHours(18, 0, 0, 0);
      try {
        const response = await axios.get('/api/v1/booking').then((res) => {
          bookingId.push(res.data.bookings.map((booking) => booking.courseId));
          bookedDates = res.data.bookings.map(
            (booking) => booking.selectedDateTime
          );
          // console.log(bookingId);
          formattedBookedDates = bookedDates.map((item) => {
            const parsedItem = JSON.parse(item);
            const dateParts = parsedItem.date.split('-');
            const month = dateParts[1];
            const day = dateParts[2];
            const time = parsedItem.time;
            return month + '/' + day + ', ' + time;
          });

          const keysArray = timeSlots;
          for (let j = 0; j < keysArray.length; j++) {
            const timeKey = keysArray[j];
            const hour = timeKey
              .replace(`${daySelected}_`, '')
              .replace('-', ':');
            const splitDate = daySelected.split('-');
            const monthWithZero = splitDate[1];
            const monthWithoutZero = parseInt(monthWithZero, 10);
            const date = monthWithoutZero + '/' + splitDate[2];

            const formattedTime = `${date}, ${hour}`;
            allDates.push(formattedTime);
          }
          allDatesUnique = [...new Set(allDates)];
          for (let i = 0; i < allDatesUnique.length; i++) {
            if (formattedBookedDates.includes(allDatesUnique[i]) === false) {
              allowedDates = allowedDates + ' ' + allDatesUnique[i];
            } else {
              forbiddenDates.push(allDatesUnique[i]);
            }
          }
          for (let i = 0; i < forbiddenDates.length; i++) {
            updatedForbiddenDates.push(forbiddenDates[i].split(', ')[1]);
          }
        });

        localStorage.setItem(
          'forbiddenDates',
          JSON.stringify(formattedBookedDates)
        );
        what = [...generateTimeSlots()];
        return what;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };
  let spliced = generateTimeSlots();
  let fine = fetchData();

  let myArray = [];
  fine
    .then((value) => {
      myArray = value;
      const keys = myArray.map((obj) => obj.key);

      localStorage.setItem('keys', JSON.stringify(keys));
      let uiKeys = [];
      uiKeys.push(localStorage.getItem('keys'));

      let finalArray = [];
      for (let i = 0; i < uiKeys.length; i++) {
        if (uiKeys[i] === '') {
          continue;
        } else if (uiKeys.length === 21) {
          uiKeys.shift();
        }
        finalArray.push(
          <button
            key={uiKeys[i]}
            onClick={() => handleTimeSelect(uiKeys[i])}
            className={`time-slot ${
              selectedTime === uiKeys[i] ? 'selected' : ''
            } `}
            disabled={false}
          >
            {uiKeys[i]}
          </button>
        );
      }
      return finalArray;
    })
    .catch((error) => {
      console.error(error);
    });
  let day = [];
  let slotsDays = [];

  const updatedDates = () => {
    let printedArray = [];
    const finalVersion = localStorage.getItem('forbiddenDates');
    const allSlots = localStorage.getItem('allSlots');
    const editedDaySelected = daySelected.split('-');
    day.push(editedDaySelected[1] + '/' + editedDaySelected[2]);
    let allSlotsUnique = [...new Set(allSlots.split(','))];

    for (let i = 0; i < allSlots.length; i++) {
      slotsDays.push(day + ', ' + allSlotsUnique[i]);
    }
    const newString = finalVersion.replace(/[[\]]/g, '');
    let finalTimes = newString.split(',');
    const arrayFinalVersion = finalVersion
      .split(/",|,"/)
      .map((str) => str.replace(/[[\]"]+/g, ''));
    let finalVersionOnDrugs = finalTimes.map((s) => s.replace(/"/g, ''));

    const timesArray = [];
    let inactiveTimes = [];
    let inactiveDates = [];
    for (let i = 0; i < arrayFinalVersion.length; i++) {
      for (let j = 0; j < slotsDays.length; j++) {
        if (arrayFinalVersion[i] === slotsDays[j]) {
          inactiveDates.push(slotsDays[j]);
          let inactiveString = inactiveDates.toString();
          let inactiveTime = inactiveString.split(', ')[1];
          inactiveTimes.push(inactiveTime);
        }
      }
    }

    let disabled = inactiveTimes;
    let bookedId = [];
    for (let i = 0; i < bookingId.length; i++) {
      bookedId = bookingId[i];
    }

    // console.log(bookedId);

    let storageCourseId = localStorage.getItem('courseId');
    for (let i = 0; i < bookedId.length; i++) {
      // console.log(bookedId[i]);
      if (bookedId[i] != storageCourseId) {
        console.log('does not match');
      }
    }

    for (let i = 0; i < allSlotsUnique.length; i++) {
      for (let j = 0; j < disabled.length; j++) {
        if (allSlotsUnique[i] === disabled[j]) {
          continue;
        } else if (allSlotsUnique.length === 21) {
          allSlotsUnique.shift();
        }
        printedArray.push(
          <button
            key={allSlotsUnique[i]}
            onClick={() => handleTimeSelect(allSlotsUnique[i])}
            className={`time-slot ${
              selectedTime === allSlotsUnique[i] ? 'selected' : ''
            } `}
            disabled={false}
          >
            {allSlotsUnique[i]}
          </button>
        );
      }
    }

    return printedArray;
  };
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

      <body>{generateTimeSlots()}</body>
      <body>{updatedDates()}</body>
      <div className="nextLink">
        <Link
          className="calendar-continue-link"
          to={`/booking_info/${courseID}`}
          onClick={handleLinkClick}
          disabled={disableNext}
        >
          next
        </Link>
      </div>
    </div>
  );
};

export default Calendar;
