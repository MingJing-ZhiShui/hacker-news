import React, { Component } from 'react';
import StoryList from './components/StoryList'
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <StoryList />
      </div>
    );
  }
}

export default App;
