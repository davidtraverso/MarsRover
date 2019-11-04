import React, { Component } from 'react';
import Photo from './Photo';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solRange: ['---', '2530', '2208', '5111'],
      solSelection: 0,
      solMax: 0,
      cameraSelection: '',
      rover: '',
      APIData: [],
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
    var trimIndex = this.state.cameraSelection.indexOf('|');
    var url =
      'https://api.nasa.gov/mars-photos/api/v1/rovers/' +
      this.state.rover +
      '/photos?sol=' +
      this.state.solSelection +
      '&api_key=7bmHdyZcr9I0s5h0ZU02R58oeCkEu3EjmkZSKdX8&camera=' +
      this.state.cameraSelection.slice(0, trimIndex - 1);

    // Query the API
    const getRequest = async () => {
      const getResponse = await fetch(url);
      const getJSON = await getResponse.json();
      // Test results
      console.log('API data:');
      console.log(getJSON);

      // Extract photo sources
      var photoSources = [];
      // ** write the function here **
      // ** write the function here **
      // ** write the function here **

      this.setState({
        APIData: photoSources
      });
    };

    // Invoke it!
    getRequest();
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

    var source = [];

    return (
      <div className="main">
        <h1 id="pageTitle">Welcome to the Red Planet</h1>
        <section className="rover">
          <h3>Rover selection:</h3>
          <select id="roverSelect" name="rover" onChange={this.handleSelect}>
            {rovers.map((rover, i) => {
              return (
                <option key={i} value={rover}>
                  {rover}
                </option>
              );
            })}
          </select>
        </section>

        <section className="sol">
          <p>Sol selection: {this.state.solSelection}</p>
          0 <input type="range" min="0" max={this.state.solRange[2]} onChange={this.handleChange} />{' '}
          {this.state.solRange[solRange]}
        </section>

        <section className="cam">
          <p>Camera selection:</p>
          <select id="cameraSelect" name="cameraSelection" onChange={this.handleSelect}>
            {cameras.map((camera, i) => {
              return (
                <option key={i} value={camera}>
                  {camera}
                </option>
              );
            })}
          </select>
        </section>

        <section className="go">
          <input type="button" value="Show me Mars!" disabled={this.state.isReady} onClick={this.handleClick} />
        </section>

        <section className="image">
          <div>
            <Photo source={this.state.APIData} />
          </div>
        </section>

        <section className="footer">
          <p>Courtesy of MarsPhoto API maintained by ________</p>
        </section>
      </div>
    );
  }
}

export default Landing;
