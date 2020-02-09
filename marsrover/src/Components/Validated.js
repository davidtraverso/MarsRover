import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

function Validated(props) {
  var isVisible = props.isVisible;
  // Toggle visibility on props change (i.e. on selection)
  isVisible ? (isVisible = 'visible') : (isVisible = 'hidden');

  return (
    <span className="validIcon">
      <FontAwesomeIcon visibility={isVisible} icon={faCheckCircle} size='lg'/>
    </span>
  );
}

export default Validated;
