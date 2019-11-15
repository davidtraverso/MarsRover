import React from 'react';

const Cameras = props => {
  const { cameras, onClick } = props;

  return (
    <div>
      {cameras.map((cam, i) => {
      return <input type="button" key={i} value={cam} onClick={onClick('cameraSelection')}/>;
      })}
    </div>
  );
};

export default Cameras;
