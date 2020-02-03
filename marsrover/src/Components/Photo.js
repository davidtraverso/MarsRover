import React, { useState, useEffect } from 'react';

function Photo(props) {
  const [imageSRC, setImageSRC] = useState('https://source.unsplash.com/pnPS3Ox_2vE');

  useEffect(() => {
    setImageSRC(props.hero);
  }, [props.hero]);

  return (
    <div id="photoMain">
      <img src={imageSRC} alt="mars landscape" />
    </div>
  );
}

// ** Historical, class-based component **

// class Photo extends Component {
//   render() {
//     return (
//       <div id="photoMain">
//         <img src={this.props.source[0] || 'https://source.unsplash.com/pnPS3Ox_2vE'} alt="mars landscape" />
//       </div>
//     );
//   }
// }

export default Photo;
