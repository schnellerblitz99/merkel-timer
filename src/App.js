import logo from './merkel3.png';
import luefter from './luefter1.png';

import React, { Component } from 'react';
import './App.css';
import gong from './gong.mp3';
import merkel from './merkel.mp3';

const zeroPad = (num, places) => String(num).padStart(places, '0')

class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = {seconds : 0, open : 0};
    this.audio_gong = new Audio(gong);
    this.audio_merkel = new Audio(merkel);
    this.close_time = 10;
    this.open_time = 5;
  }

  tick(){
    this.setState(state => ({
      seconds: state.seconds + 1
    }));
    if (this.state.open === 0){
      if (this.state.seconds > this.close_time){
        this.playMerkel();
      }
    }
    if (this.state.open === 1){
      if (this.state.seconds > this.open_time){
        this.playGong();
      }
    }
  }

  componentDidMount(){
    console.log("Timer mounted")
  }

  playMerkel(){
    // play sound and set back
    this.resetAndStopTimer();
    this.audio_merkel.play();
    this.setState(state => ({
      open : 1
    }));
    this.startTimer();
  }

  playGong(){
    this.resetAndStopTimer();
    this.audio_gong.play();
    this.setState(state => ({
      open : 0
    }));
    this.startTimer();
  }

  startTimer(){
    this.interval = setInterval(() => this.tick(), 1000);
  }

  stopTimer(){
    clearInterval(this.interval);
  }

  resetTimer(){
    this.setState(state => ({
      seconds : 0
    }));
  }

  resetAndStopTimer(){
    clearInterval(this.interval)
    this.setState(state => ({
      seconds: 0
    }));
  }

  componentWillUnmount(){
    clearInterval(this.interval)
  }

  formatTime(){
    if (this.state.open === 0){
      var t = this.close_time - this.state.seconds;
    }
    else {
      var t = this.open_time - this.state.seconds;
    }

    var h = Math.floor(t / 3600);
    var m = Math.floor((t - (h*3600)) / 60);
    var s = Math.floor(t - h * 3600 - m* 60);

    return(
      <p>
        {zeroPad(h,2)}:{zeroPad(m,2)}:{zeroPad(s,2)}
      </p>
    )
    }

  showImage(){
    if (this.state.open === 1){
      return(
        <img src={luefter} className="App-logo" alt="logo" />
      )
    }
    else {
      return(
        <img src={logo} className="App-logo" alt="logo" />
        )
    }
  }

  render(){
    return (
      <div>
        <p>{this.showImage()}</p>
        <p>{this.formatTime()}</p>
        <button onClick={() => this.startTimer()}>
          Start Timer
        </button>
        <button onClick={() => this.resetAndStopTimer()}>
          Stop and Reset
        </button>

      </div>
    )
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Timer />
      </header>
    </div>
  );
}

export default App;
