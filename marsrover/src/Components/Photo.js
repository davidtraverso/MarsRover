import React, { Component } from 'react';

class Photo extends Component {
  render() {
    const imgStyle = {
      width: '50%',
      height: 'auto',
      margin: '0 auto'
    };
    return (
      <div>
        <h1>Photo Page</h1>
        <img
          style={imgStyle}
          src="https://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/00990/opgs/edr/fcam/FRB_485373416EDR_F0480458FHAZ00323M_.JPG"
          alt="mars landscape"
        />
        "Test Code test code test code"
      </div>
    );
  }
}

export default Photo;
