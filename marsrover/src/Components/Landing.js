import React, { Component } from 'react';
import Photo from './Photo';
import Button from './Button';
import Thumbnail from './Thumbnail';
import Cameras from './Cameras';
import * as Selections from '../modules/selections';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solRange: ['---', '2530', '2654', '5111'],
      solSelection: 0,
      solMax: 0,
      cameraSelection: '',
      rover: '',
      APIData: ['https://source.unsplash.com/pnPS3Ox_2vE'],
      isReady: true
    };

    this.handleChange = this.handleChange.bind(this);
    // this.handleSelect = this.handleSelect.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.validateButton = this.validateButton.bind(this);
  }

  // Button select (higher order)
  buttonSelect = input => e => {
    e.preventDefault();
    console.log(input);
    console.log(e.target.value);
    this.setState({
      [input]: e.target.value
    });
  };

  // Range input
  handleChange = e => {
    e.preventDefault();
    this.setState({
      solSelection: e.target.value
    });
    this.validateButton();
  };

  // Make the button clickable IFF all selection criteria has been made.
  validateButton = () => {
    if (this.state.cameraSelection != '' && this.state.rover != '' && this.state.solSelection != '') {
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
      getJSON.photos.map(i => {
        photoSources.push(i.img_src);
      });
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

    var source = [];

    return (
      <div className="main">
        <h1 id="pageTitle">Welcome to the Red Planet</h1>
        <p>
          <ul>
            Current State:
            <li>solSelection: {this.state.solSelection}</li>
            <li>cameraSelection: {this.state.cameraSelection}</li>
            <li>rover: {this.state.rover}</li>
            <li>APIData: {this.state.APIData.length}</li>
          </ul>
        </p>

        {/* ROVER SLECTION */}
        <section className="rover">
          <h4>Rover selection:</h4>
          <h5>Curiosity</h5>
          <Button rovers={['https://mars.nasa.gov/layout/general/images/msl.png']} onClick={this.buttonSelect} />
        </section>

        {/* SOL SLECTION */}
        <section className="sol">
          <p>Sol selection: {this.state.solSelection}</p>
          0 <input type="range" min="0" max={this.state.solRange[2]} onChange={this.handleChange} />
          &nbsp;{this.state.solRange[2]}
        </section>

        {/* CAMERA SLECTION */}
        <section className="cam">
          <p>Camera selection:</p>
          <Cameras cameras={Selections.cameras} onClick={this.buttonSelect} />
        </section>

        <section className="go">
          <button onClick={this.handleClick}>Show me Mars!</button>
        </section>

        <section className="image">
          <div id="imgWrapper">
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
