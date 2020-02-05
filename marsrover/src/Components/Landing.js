import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Photo from './Photo';
import Button from './Button';
import Thumbnail from './Thumbnail';
import Cameras from './Cameras';
import Go from './Go';
import * as Selections from '../modules/selections';

function Landing() {
  const [solRange, setSolRange] = useState(['---', 2530, 2654, 5111]);
  const [sol, setSol] = useState(null);
  // const [solMax, setSolMax] = useState(0);
  const [camera, setCamera] = useState(null);
  const [rover, setRover] = useState(null);
  const [APIData, setAPIData] = useState([]);
  const [visibility, setVisibility] = useState('hidden');
  const [heroSrc, setHeroSrc] = useState('https://source.unsplash.com/pnPS3Ox_2vE');
  const [isDisabled, setIsDisabled] = useState(true);

  // Button select
  function buttonSelect(e) {
    e.preventDefault();
    e.target.name === 'curiosity'
      ? setRover(e.target.name)
      : e.target.name === 'camera'
      ? setCamera(e.target.value)
      : console.log(e.target);
  }

  // Range input
  function handleChange(e) {
    e.preventDefault();
    setSol(e.target.value);
  }

  // Increment & Decrement
  function increment(e) {
    var currentSelection = parseInt(sol);
    var incrementor = parseInt(e.target.name);
    // iterate Sol counter
    setSol(currentSelection + incrementor);
    console.log(sol);
  }

  // Make the button clickable IFF all selection criteria has been made.
  function validateButton() {
    console.log(camera, rover, sol);
    camera && rover && sol ? setIsDisabled(false) : console.log(': Incomplete form');
  }

  // HTTP Request on button click
  function handleClick() {
    var trimIndex = camera.indexOf('|');
    var url =
      'https://api.nasa.gov/mars-photos/api/v1/rovers/' +
      rover +
      '/photos?sol=' +
      sol +
      '&api_key=7bmHdyZcr9I0s5h0ZU02R58oeCkEu3EjmkZSKdX8&camera=' +
      camera.slice(0, trimIndex - 1);

    // Query the API
    const getRequest = async () => {
      const getResponse = await fetch(url);
      const getJSON = await getResponse.json();
      // Test results
      console.log('API data:');
      console.log(getJSON);

      // Extract photo sources
      var photoSources = [];
      getJSON.photos.map(i => {
        photoSources.push(i.img_src);
      });
      setAPIData(photoSources);
      setHeroSrc(photoSources[0]);
    };

    // Invoke it!
    getRequest();
  }

  // Thumbnail onClick property to toggle Hero image
  function imgClick(e) {
    e.preventDefault();
    setHeroSrc(e.target.src);
  }

  // Check for button validation
  useEffect(() => {
    validateButton();
    console.log('validating');
  });

  // Check for icon visibility
  // *** Write function here ***
  // *** Write function here ***
  // *** Write function here ***

  return (
    <div className="main">
      <h1 id="pageTitle">Welcome to the Red Planet</h1>

      {/* ROVER Selection */}
      <section className="rover">
        <h4 id="roverId">
          Rover selection:
          <span className="validIcon">
            <FontAwesomeIcon icon={faCheckCircle} />
          </span>
        </h4>
        <p className="roverLabel">Curiosity</p>
        <div id="roverIcon">
          <Button rovers={['https://mars.nasa.gov/layout/general/images/msl.png']} onClick={buttonSelect} />
        </div>
      </section>
      {/* SOL Selection */}
      <section className="sol">
        <h4 id="solId">
          Sol <br />
          selection:
          <span className="validIcon">
            <FontAwesomeIcon visibility={visibility} icon={faCheckCircle} />
          </span>
        </h4>
        <div id="solState">
          <button name={-1} onClick={increment}>
            &#60;
          </button>{' '}
          {sol}{' '}
          <button name={1} onClick={increment}>
            &#62;
          </button>
        </div>
        <div id="solSelect">
          0 <input type="range" min={0} max={solRange[2]} onChange={handleChange} />
          &nbsp;{solRange[2]}
        </div>
      </section>
      {/* CAMERA Selection */}
      <section className="cam">
        <h4>
          Camera selection:
          <span className="validIcon">
            <FontAwesomeIcon icon={faCheckCircle} />
          </span>
        </h4>
        <Cameras cameras={Selections.cameras} onClick={buttonSelect} />
      </section>
      {/* PHOTO Render */}
      <section className="image">
        <div id="imgWrapper">
          <Photo hero={heroSrc} />
          <Thumbnail source={APIData} imgClick={imgClick} />
        </div>
      </section>
      {/* GO Render */}
      <Go handleClick={handleClick} isDisabled={isDisabled} />
      <section className="footer">
        <p>Courtesy of MarsPhoto API maintained by ________</p>
      </section>
    </div>
  );
}

export default Landing;
