import React, { Component } from 'react';

class Button extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const rovers = [...this.props.rovers];
    const { onClick } = this.props;
    return (
      <div>
        <input
          type="image"
          width="100"
          height="100"
          src={rovers[0]}
          name="curiosity"
          value="curiosity"
          onClick={onClick}
        />
      </div>
    );
  }
}

export default Button;
