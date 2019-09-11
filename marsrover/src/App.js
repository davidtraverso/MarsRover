import React, { Component } from 'react';
import Landing from './Components/Landing';
import Photo from './Components/Photo';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Landing />
      </div>
    );
  }
}

export default App;
