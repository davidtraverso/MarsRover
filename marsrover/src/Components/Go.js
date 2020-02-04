import React from 'react';

function Go(props) {
  const isDisabled = props.isDisabled;
  const handleClick = props.handleClick;

  return (
    <section className="go">
      <button onClick={handleClick} disabled={isDisabled}>
        Show me Mars!
      </button>
    </section>
  );
}

export default Go;
