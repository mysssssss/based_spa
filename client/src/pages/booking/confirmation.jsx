import React from 'react';

function ConfirmationPage() {
  const name = localStorage.getItem('name');
  const email = localStorage.getItem('email');
  const selectedDateTime = localStorage.getItem('selectedDateTime');
  function formatSelectedDateTime(selectedDateTime) {
    const { date, time } = JSON.parse(selectedDateTime);
    const formattedDate = new Date(date).toLocaleDateString(undefined, {
      month: 'long',
      day: 'numeric',
    });
    const formattedTime = time;
    return `${formattedDate}, ${formattedTime}`;
  }
  const formattedSelectedDateTime = formatSelectedDateTime(selectedDateTime);

  return (
    <div className="confirmationContainer">
      <h1 className="confirmationHead">confirmation</h1>
      <div>
        <p className="confirmationParagraph">
          Thank you for making an appointment, {name}!
        </p>
        <p className="confirmationParagraph">
          We will be expecting you on {formattedSelectedDateTime}
        </p>
        <p className="confirmationParagraph">
          We sent you a confirmation email at {email}
        </p>
      </div>
    </div>
  );
}

export default ConfirmationPage;
