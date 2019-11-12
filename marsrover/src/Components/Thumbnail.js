import React, { Component } from 'react';

class Thumbnail extends Component {
  constructor(props) {
    super();
  }
  render() {
    var thumbArray = [
      'https://mars.nasa.gov/mer/gallery/all/1/f/276/1F152687335EFF37JHP1201L0M1-BR.JPG',
      'https://mars.nasa.gov/mer/gallery/all/2/f/276/2F150874474EFF8953P1110L0M1-BR.JPG',
      'https://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/00990/opgs/edr/fcam/FLB_485386521EDR_F0480876FHAZ00304M_.JPG'
    ];
    return (
      <div id="thumbWrapper">
        <ul>
          {thumbArray.map((thumb, index) => {
            return (
              <li key={index}>
                <img src={thumb} alt="" />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
export default Thumbnail;
