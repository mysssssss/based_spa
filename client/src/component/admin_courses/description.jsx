import { useState } from 'react';

function Description({ text, className }) {
  const [showFull, setShowFull] = useState(false);
  const limit = 35;

  const toggleShowFull = () => {
    setShowFull((prev) => !prev);
  };

  const displayedText = showFull ? (
    <span className="full-text">{text}</span>
  ) : (
    <span className="truncated-text">
      {text.slice(0, limit)}
      {text.length > limit && <>&hellip;</>}
    </span>
  );

  return (
    <div className={`description ${className}`}>
      {displayedText}
      {text.length > limit && (
        <button onClick={toggleShowFull}>
          {showFull ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  );
}

export default Description;
