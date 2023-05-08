// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import 'bootstrap';
// import axios from 'redaxios';

// const Calendar = () => {
//   const courseID = localStorage.getItem('courseId');

//   const [isNavOpen, setIsNavOpen] = useState(false);
//   const [selectedDate, setSelectedDate] = useState('');
//   const [selectedTime, setSelectedTime] = useState('');
//   const [isDateSelected, setIsDateSelected] = useState('');
//   const [isDateBooked, setIsDateBooked] = useState(false);
//   const [currentMonth, setCurrentMonth] = useState(new Date());

//   const handleDateClick = (day) => {
//     setSelectedDate(day);
//     localStorage.setItem('daySelected', day);
//     console.log('handle date click');
//     updatedDates();
//   };

//   const handleLinkClick = () => {
//     const selectedDateTime = {
//       date: selectedDate,
//       time: selectedTime,
//     };
//     localStorage.setItem('selectedDateTime', JSON.stringify(selectedDateTime));
//     setIsNavOpen(false);
//     console.log('handle Link Click');
//   };

//   const handleTimeSelect = (time) => {
//     setSelectedTime(time);
//   };
//   let disableNext;
//   if (selectedTime === '') {
//     disableNext = true;
//     console.log('handle time select');
//   }

//   const handleMonthChange = (step) => {
//     setCurrentMonth((prevMonth) => {
//       const newMonth = new Date(prevMonth);
//       newMonth.setMonth(prevMonth.getMonth() + step);
//       return newMonth;
//     });
//     console.log('handle month change');
//   };

//   const generateCalendar = () => {
//     const calendar = [];
//     const monthStart = new Date(
//       currentMonth.getFullYear(),
//       currentMonth.getMonth(),
//       1
//     );
//     const monthEnd = new Date(
//       currentMonth.getFullYear(),
//       currentMonth.getMonth() + 1,
//       0
//     );
//     const startDate = new Date(monthStart);
//     startDate.setDate(startDate.getDate() - startDate.getDay());

//     while (startDate <= monthEnd) {
//       const week = [];
//       for (let i = 0; i < 7; i++) {
//         const day = new Date(startDate);
//         day.setDate(startDate.getDate() + i);
//         const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
//         const isToday =
//           day.toDateString() === new Date().toDateString() && isCurrentMonth;
//         const isSelected =
//           selectedDate === day.toISOString().substring(0, 10) && isCurrentMonth;

//         week.push(
//           <td
//             key={day.toISOString()}
//             className={`day ${
//               isCurrentMonth ? 'current-month' : 'other-month'
//             } ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
//             onClick={() => handleDateClick(day.toISOString().substring(0, 10))}
//           >
//             {day.getDate()}
//           </td>
//         );
//       }
//       calendar.push(<tr key={startDate.toISOString()}>{week}</tr>);
//       startDate.setDate(startDate.getDate() + 7);
//     }
//     console.log('calendar made)');
//     return calendar;
//   };

//   let daySelected = localStorage.getItem('daySelected');
//   let allowedDates = [];
//   let forbiddenDates = [];
//   let allDates = [];
//   let fetchDataCalled = false;
//   let updatedForbiddenDates = [];
//   let wantedSlots = [];
//   let times = [];
//   let allDatesUnique = [];
//   // let daySlot = handleDateClick();

//   // let timeArray = [];
//   const whateverSlots = [];
//   let timeSlotKeys = [];
//   let timeSlots = [];

//   let splicedSlots = [];
//   const generateTimeSlots = () => {
//     const startDate = new Date(selectedDate);
//     startDate.setHours(8, 0, 0, 0);
//     const endDate = new Date(selectedDate);
//     endDate.setHours(18, 0, 0, 0);

//     // const result = allDates.filter((item) => !forbiddenDates.includes(item));
//     wantedSlots = allDatesUnique.filter(
//       (item) => !forbiddenDates.includes(item)
//     );

//     // while (startDate < endDate) {
//     for (let i = 0; i < wantedSlots.length; i++) {
//       times.push(wantedSlots[i].split(', ')[1]);
//     }
//     const uniqueTimes = [...new Set(times)];

//     for (let i = 0; i < uniqueTimes.length; i++) {
//       wantedSlots.push(
//         <button
//           key={uniqueTimes[i]}
//           onClick={() => handleTimeSelect(uniqueTimes[i])}
//           className={`time-slot ${
//             selectedTime === uniqueTimes[i] ? 'selected' : ''
//           } `}
//           disabled={false}
//         >
//           {uniqueTimes[i]}
//         </button>
//       );
//     }
//     splicedSlots = wantedSlots.splice(19);
//     for (let i = 0; i < splicedSlots.length; i++) {
//       whateverSlots.push(splicedSlots[i]);
//     }

//     while (startDate < endDate) {
//       timeSlotKeys = timeSlots.map((timeSlot) => timeSlot.key);
//       // let newTimeSlotKeys = [];
//       let time = startDate.toLocaleTimeString('en-US', {
//         hour: 'numeric',
//         minute: '2-digit',
//         hour12: true,
//       });
//       startDate.setMinutes(startDate.getMinutes() + 30);
//       // for (let i = 0; i < timeSlotKeys.length; i++) {
//       //   const newDay = daySelected.split('-');
//       //   const updatedDate = newDay[1] + '/' + newDay[2];
//       //   let newKey = updatedDate + ', ' + timeSlotKeys[i]; // Append daySelected to each item
//       //   newTimeSlotKeys.push(newKey);
//       // }

//       // const isStringInArray = (arr, target) => {
//       //   return arr.includes(target);
//       // };
//       // const result = isStringInArray(forbiddenDates, time);
//       // if (forbiddenDates != '') {
//       timeSlots.push(
//         // <button
//         //   key={time}
//         //   onClick={() => handleTimeSelect(time)}
//         //   className={`time-slot ${selectedTime === time ? 'selected' : ''} `}
//         //   disabled={false}
//         // >
//         //   {time}
//         // </button>
//         time
//       );
//     }
//     console.log('generate time slots running');
//     return splicedSlots;
//   };

//   generateTimeSlots();

//   let what = [];
//   const fetchData = async () => {
//     if (!fetchDataCalled) {
//       // Check if fetchData() has not been called yet
//       fetchDataCalled = true;

//       const startDate = new Date(selectedDate);
//       startDate.setHours(8, 0, 0, 0);
//       const endDate = new Date(selectedDate);
//       endDate.setHours(18, 0, 0, 0);
//       try {
//         const response = await axios.get('/api/v1/booking').then((res) => {
//           const bookedDates = res.data.bookings.map(
//             (booking) => booking.selectedDateTime
//           );
//           console.log(bookedDates);

//           // var splitAlreadySelectedTimes = alreadySelectedTimes.split(',');
//           const keysArray = timeSlots;

//           for (let j = 0; j < keysArray.length; j++) {
//             const timeKey = keysArray[j];
//             const hour = timeKey
//               .replace(`${daySelected}_`, '')
//               .replace('-', ':');
//             const splitDate = daySelected.split('-');
//             const monthWithZero = splitDate[1];
//             const monthWithoutZero = parseInt(monthWithZero, 10);
//             const date = monthWithoutZero + '/' + splitDate[2];

//             const formattedTime = `${date}, ${hour}`;
//             allDates.push(formattedTime);
//           }
//           allDatesUnique = [...new Set(allDates)];
//           for (let i = 0; i < allDatesUnique.length; i++) {
//             if (bookedDates.includes(allDatesUnique[i]) === false) {
//               allowedDates = allowedDates + ' ' + allDatesUnique[i];
//             } else {
//               forbiddenDates.push(allDatesUnique[i]);
//             }
//           }
//           for (let i = 0; i < forbiddenDates.length; i++) {
//             updatedForbiddenDates.push(forbiddenDates[i].split(', ')[1]);
//           }
//           // for (let i = 0; i < updatedForbiddenDates.length; i++) {
//           //   for (let j = 0; j < timeSlotKeys; j++) {

//           // }
//         });
//         what = [...generateTimeSlots()];
//         console.log('fetch data running');
//         return what;
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     }
//   };
//   let spliced = generateTimeSlots();
//   let fine = fetchData();
//   let myArray = [];
//   fine
//     .then((value) => {
//       myArray = value; // Store the array value in a new variable
//       const keys = myArray.map((obj) => obj.key);

//       // console.log(keys);
//       localStorage.setItem('keys', JSON.stringify(keys));
//       let uiKeys = [];
//       uiKeys.push(localStorage.getItem('keys'));

//       let finalArray = [];
//       for (let i = 0; i < uiKeys.length; i++) {
//         if (uiKeys[i] === '') {
//           continue;
//         } else if (uiKeys.length === 21) {
//           uiKeys.shift();
//           // console.log(finalVersionOnDrugs);
//         }
//         finalArray.push(
//           <button
//             key={uiKeys[i]}
//             onClick={() => handleTimeSelect(uiKeys[i])}
//             className={`time-slot ${
//               selectedTime === uiKeys[i] ? 'selected' : ''
//             } `}
//             disabled={false}
//           >
//             {uiKeys[i]}
//           </button>
//         );
//       }
//       // console.log(finalArray);
//       return finalArray;
//     })
//     .catch((error) => {
//       console.error(error); // Handle any errors if needed
//     });
//   const updatedDates = () => {
//     let printedArray = [];
//     const finalVersion = localStorage.getItem('keys');
//     // console.log(finalVersion);
//     const newString = finalVersion.replace(/[[\]]/g, '');
//     let finalTimes = newString.split(',');
//     // console.log(finalTimes);
//     let finalVersionOnDrugs = finalTimes.map((s) => s.replace(/"/g, ''));

//     // console.log(finalVersionOnDrugs);
//     let disabledDates = [];
//     for (let i = 0; i < finalVersionOnDrugs.length; i++) {
//       for (let j = 0; j < timeSlots.length; j++) {
//         // console.log(timeSlots)
//         // console.l
//         if (timeSlots[j] != finalVersionOnDrugs[i]) {
//           disabledDates.push(timeSlots[j]);
//         }
//       }
//     }

//     console.log();

//     for (let i = 0; i < finalVersionOnDrugs.length; i++) {
//       // console.log(finalVersionOnDrugs);
//       if (finalVersionOnDrugs[i] === '') {
//         continue;
//       } else if (finalVersionOnDrugs.length === 21) {
//         finalVersionOnDrugs.shift();
//         // console.log(finalVersionOnDrugs);
//       }
//       printedArray.push(
//         <button
//           key={finalVersionOnDrugs[i]}
//           onClick={() => handleTimeSelect(finalVersionOnDrugs[i])}
//           className={`time-slot ${
//             selectedTime === finalVersionOnDrugs[i] ? 'selected' : ''
//           } `}
//           disabled={false}
//         >
//           {finalVersionOnDrugs[i]}
//         </button>
//       );
//     }
//     // console.log(finalArray);
//     return printedArray;
//   };
//   updatedDates();

//   return (
//     <div className="booking-calendar-container">
//       <div className="month-header">
//         <button className="month-button" onClick={() => handleMonthChange(-1)}>
//           <span className="arrow left"></span>
//         </button>
//         <h2>
//           {currentMonth.toLocaleString('default', { month: 'long' })}{' '}
//           {currentMonth.getFullYear()}
//         </h2>
//         <button className="month-button" onClick={() => handleMonthChange(1)}>
//           <span className="arrow right"></span>
//         </button>
//       </div>
//       <table className="calendar">
//         <thead>
//           <tr>
//             <th>Sun</th>
//             <th>Mon</th>
//             <th>Tue</th>
//             <th>Wed</th>
//             <th>Thu</th>
//             <th>Fri</th>
//             <th>Sat</th>
//           </tr>
//         </thead>
//         <tbody>{generateCalendar()}</tbody>
//       </table>
//       {/* <div className="selected-date">
//         Selected date:{' '}
//         {selectedDate ? new Date(selectedDate).toDateString() : 'none'}
//       </div> */}
//       <body>{updatedDates()}</body>

//       <Link
//         className="calendar-continue-link"
//         to={`/booking_info/${courseID}`}
//         onClick={handleLinkClick}
//         disabled={disableNext}
//       >
//         next
//       </Link>
//     </div>
//   );
// };

// export default Calendar;
