import React, { Component } from 'react';

class Photo extends Component {
  render() {
    return (
      <div id="photoMain">
        <img src={this.props.source[0] || 'https://source.unsplash.com/puVGY_DiVwg'} alt="mars landscape" />
      </div>
    );
  }
}

export default Photo;
