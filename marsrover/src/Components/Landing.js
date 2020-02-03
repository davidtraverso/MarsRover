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
      solRange: ['---', 2530, 2654, 5111],
      solSelection: 0,
      solMax: 0,
      cameraSelection: null,
      rover: null,
      APIData: [],
      placeholder: 'https://source.unsplash.com/pnPS3Ox_2vE',
      heroSrc: 'https://source.unsplash.com/pnPS3Ox_2vE',
      isDisabled: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.validateButton = this.validateButton.bind(this);
    this.increment = this.increment.bind(this);
    this.imgClick = this.imgClick.bind(this);
  }

  // Button select (higher order)
  buttonSelect = input => e => {
    e.preventDefault();
    this.setState({
      [input]: e.target.value
    });
    this.validateButton();
  };

  // Range input
  handleChange = e => {
    e.preventDefault();
    this.setState({
      solSelection: e.target.value
    });
    this.validateButton();
  };

  // Increment & Decrement
  increment = e => {
    e.preventDefault();
    var currentSelection = parseInt(this.state.solSelection);
    var incrementor = parseInt(e.target.name);
    this.setState({
      solSelection: currentSelection + incrementor
    });
  };

  // Make the button clickable IFF all selection criteria has been made.
  validateButton = () => {
    if (this.state.cameraSelection && this.state.rover && this.state.solSelection) {
      this.setState({
        isReady: false
      });
      console.log('Complete form');
      this.setState({ isDisabled: false });
    } else {
      console.log('Incomplete form');
    }
  };

  // HTTP Request on button click
  handleClick = () => {
    this.validateButton();
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

  // Thumbnail onClick property to toggle Hero image
  imgClick = e => {
    e.preventDefault();
    this.setState({ heroSrc: e.target.src });
  };

  render() {
    var rovers = ['Curiosity', 'Spirit', 'Opportunity'];
    var solRange = 0;

    var source = [];

    return (
      <div className="main">
        <h1 id="pageTitle">Welcome to the Red Planet</h1>
        <ul id="criteria">
          <li>Rover</li>
          <li>Sol Date</li>
          <li>Camera</li>
        </ul>

        {/* ROVER Selection */}
        <section className="rover">
          <h4 id="roverId">Rover selection:</h4>
          <p className="roverLabel">Curiosity</p>
          <div id="roverIcon">
          <Button rovers={['https://mars.nasa.gov/layout/general/images/msl.png']} onClick={this.buttonSelect} />
          </div>
        </section>

        {/* SOL Selection */}
        <section className="sol">
          <h4 id="solId">Sol selection: </h4>
          <div id="solState">
            <button name={-1} onClick={this.increment}>
              &#60;
            </button>{' '}
            {this.state.solSelection}{' '}
            <button name={1} onClick={this.increment}>
              &#62;
            </button>
          </div>
          <div id="solSelect">
            0 <input type="range" min={0} max={this.state.solRange[2]} onChange={this.handleChange} />
            &nbsp;{this.state.solRange[2]}
          </div>
        </section>

        {/* CAMERA Selection */}
        <section className="cam">
          <h4>Camera selection:</h4>
          <Cameras cameras={Selections.cameras} onClick={this.buttonSelect} />
        </section>

        {/* FETCH Button */}
        <section className="go">
          <button onClick={this.handleClick} disabled={this.state.isDisabled}>
            Show me Mars!
          </button>
        </section>

        {/* PHOTO Render */}
        <section className="image">
          <div id="imgWrapper">
            <Photo hero={this.state.heroSrc} />
            <Thumbnail source={this.state.APIData} imgClick={this.imgClick} />
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
