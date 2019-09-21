import React, { Component } from 'react';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solRange: ['---', '2530', '2208', '5111'],
      solSelection: 0,
      solMax: 0,
      cameraSelection: '',
      rover: '',
      HTTPRequest: '',
      isReady: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.validateButton = this.validateButton.bind(this);
  }

  // Range input
  handleChange = e => {
    e.preventDefault();
    this.setState({
      solSelection: e.target.value
    });
    this.validateButton();
  };

  // Select input
  handleSelect = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
    this.validateButton();
  };

  // Make the button clickable IFF all selection criteria has been made.
  validateButton = () => {
    if (this.state.cameraSelection !== '' && this.state.rover !== '' && this.state.solSelection !== '') {
      this.setState({
        isReady: false
      });
      console.log('Complete form');
    } else {
      console.log('Incomplete form');
    }
  };

  // HTTP Request on button click
  handleClick = () => {
    let trimIndex = this.state.cameraSelection.indexOf('|');
    this.setState({
      HTTPRequest:
        'https://api.nasa.gov/mars-photos/api/v1/rovers/' +
        this.state.rover +
        '/photos?sol=' +
        this.state.solSelection +
        '&api_key=7bmHdyZcr9I0s5h0ZU02R58oeCkEu3EjmkZSKdX8&camera=' +
        this.state.cameraSelection.slice(0, trimIndex - 1)
    });
  };

  render() {
    var rovers = ['Curiosity', 'Spirit', 'Opportunity'];
    var solRange = 0;
    var cameras = [
      '--- Select a camera ---',
      'FHAZ | Front Hazard Avoidance Camera',
      'RHAZ	| Rear Hazard Avoidance Camera',
      'MAST	| Mast Camera',
      'CHEMCAM | Chemistry and Camera Complex',
      'MAHLI | Mars Hand Lens Imager',
      'MARDI | Mars Descent Imager',
      'NAVCAM | Navigation Camera',
      'PANCAM | Panoramic Camera'
    ];
    return (
      <div>
        <h1>This is the landing page!</h1>
        <hr />
        <h3>Query criteria</h3>
        <select id="roverSelect" name="rover" onChange={this.handleSelect}>
          {rovers.map((rover, i) => {
            return (
              <option key={i} value={rover}>
                {rover}
              </option>
            );
          })}
        </select>
        <br />
        <br />
        <p>Sol selection: {this.state.solSelection}</p>
        0 <input type="range" min="0" max={this.state.solRange[2]} onChange={this.handleChange} />{' '}
        {this.state.solRange[solRange]}
        <br />
        <br />
        <select id="cameraSelect" name="cameraSelection" onChange={this.handleSelect}>
          {cameras.map((camera, i) => {
            return (
              <option key={i} value={camera}>
                {camera}
              </option>
            );
          })}
        </select>
        <br />
        <br />
        <input type="button" value="Show me Mars!" disabled={this.state.isReady} onClick={this.handleClick} />
        <p>{this.state.HTTPRequest}</p>
      </div>
    );
  }
}

export default Landing;
