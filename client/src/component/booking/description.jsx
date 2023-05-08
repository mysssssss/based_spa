import React, { useState } from 'react';

function CourseDescription({ description }) {
  const [isTruncated, setIsTruncated] = useState(true);

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  return (
    <div style={{ maxWidth: 800 }}>
      {isTruncated ? (
        <React.Fragment>
          <span>{description.slice(0, 200)}</span>
          <span id="dots">...</span>
          <button onClick={toggleTruncate}>Read more</button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <span>{description}</span>
          <button onClick={toggleTruncate}>Read less</button>
        </React.Fragment>
      )}
    </div>
  );
}

export default CourseDescription;
