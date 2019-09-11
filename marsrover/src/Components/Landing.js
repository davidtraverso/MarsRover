import React, { Component } from 'react';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solSelection: 0,
      cameraSelection: '',
      HTTPRequest: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({
      solSelection: e.target.value
    });
  };

  handleSelect = e => {
    e.preventDefault();
    this.setState({
      cameraSelection: e.target.value
    });
  };

  handleClick = () => {
    this.setState({
      HTTPRequest:
        'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=' +
        this.state.solSelection +
        '&api_key=7bmHdyZcr9I0s5h0ZU02R58oeCkEu3EjmkZSKdX8&camera=' +
        this.state.cameraSelection
    });
  };

  render() {
    var cameras = [
      '--- Select a camera ---',
      'FHAZ | Front Hazard Avoidance Camera',
      'RHAZ	| Rear Hazard Avoidance Camera',
      'MAST	| Mast Camera',
      'CHEMCAM | Chemistry and Camera Complex',
      'MAHLI | Mars Hand Lens Imager',
      'MARDI | Mars Descent Imager',
      'NAVCAM | Navigation Camera',
      'PANCAM |Panoramic Camera'
    ];
    return (
      <div>
        <h1>This is the landing page!</h1>
        <hr />
        <h3>Query criteria</h3>
        <p>Sol selection (Mars day): {this.state.solSelection}</p>
        <p>Camera selection: {this.state.cameraSelection}</p>
        <form>
          <div className="form-group">
            0 <input type="range" min="0" max="1000" onChange={this.handleChange} /> 1000
            <br />
            <select id="pet-select" onChange={this.handleSelect}>
              {cameras.map((camera, i) => {
                return (
                  <option key={i} value={camera}>
                    {camera}
                  </option>
                );
              })}
            </select>
            <br />
            <input type="button" value="Show me Mars!" onClick={this.handleClick} />
            <p>{this.state.HTTPRequest}</p>
          </div>
        </form>
      </div>
    );
  }
}

export default Landing;
