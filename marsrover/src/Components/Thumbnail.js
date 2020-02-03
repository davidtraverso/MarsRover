import React, { Component } from 'react';

class Thumbnail extends Component {
  render() {
    return (
      <div id="thumbWrapper">
        <ul>
          {this.props.source.map((thumb, index) => {
            return (
              <li key={index}>
                <img data-id={index} src={thumb} alt="" onClick={this.props.imgClick} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
export default Thumbnail;
