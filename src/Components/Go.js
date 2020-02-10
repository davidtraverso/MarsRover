import React from 'react';

function Go(props) {
  const isDisabled = props.isDisabled;
  const handleClick = props.handleClick;
  var isSelected;
  props.selected ? (isSelected = 'selected') : (isSelected = '');

  return (
    <section className="go">
      <button onClick={handleClick} disabled={isDisabled} className={isSelected}>
        Show me Mars!
      </button>
    </section>
  );
}

export default Go;
