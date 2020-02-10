import React from 'react';

function Thumbnail(props) {
  const source = props.source;
  const imgClick = props.imgClick;

  return (
    <div id="thumbWrapper">
      <ul>
        {source.map((thumb, index) => {
          return (
            <li key={index}>
              <img data-id={index} src={thumb} alt="" onClick={imgClick} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Thumbnail;
