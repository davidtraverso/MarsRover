import React, { useEffect } from 'react';

const Cameras = props => {
  const { cameras, onClick, selected } = props;

  useEffect(() => {
    console.log('selected: ' + selected);
  }, [selected]);

  return (
    <div>
      {cameras.map((cam, i) => {
        var trimIndex = cam.indexOf('|');
        var isSelected;
        selected === cam ? (isSelected = 'selected') : (isSelected = ' ');
        return (
          <div>
            <input
              type="button"
              key={i}
              id={cam.slice(0, trimIndex)}
              value={cam}
              name="camera"
              onClick={onClick}
              className={`camButton ${isSelected}`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Cameras;
