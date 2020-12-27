import logo from './merkel3.png';
import luefter from './luefter1.png';
import {Howl, Howler} from 'howler';
import React, { Component } from 'react';
import './App.css';
import gong from './gong.mp3';
import merkel from './merkel.mp3';
import merkel_emoji from "./merkel_emoji.jpg";
import Select from 'react-select';


const zeroPad = (num, places) => String(num).padStart(places, '0')

class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = {seconds : 0, open : 0, close_time : 3600, open_time : 600};
    this.audio_gong = new Howl({src: gong});
    this.audio_merkel = new Howl({src: merkel});
  }

  tick(){
    this.setState(state => ({
      seconds: state.seconds + 1
    }));
    if (this.state.open === 0){
      if (this.state.seconds > this.state.close_time){
        this.playMerkel();
      }
    }
    if (this.state.open === 1){
      if (this.state.seconds > this.state.open_time){
        this.playGong();
      }
    }
  }

  componentDidMount(){
    console.log("Timer mounted")
  }

  playMerkel(){
    // play sound and set back
    this.audio_merkel.play();
    this.resetAndStopTimer();
    this.setState(state => ({
      open : 1
    }));
    this.startTimer();
  }

  setTimeOpen = (event) => {
    console.log("setTimeOpen()");
    this.setState(state => ({
      open_time: event.target.value
    }));
  }

  setTimeClose = (event) => {
    console.log("setTimeClose()");
    this.setState(state => ({
      close_time: event.target.value
    }));
  }

  playGong(){
    this.audio_gong.play();
    this.resetAndStopTimer();
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
      var t = this.state.close_time - this.state.seconds;
    }
    else {
      var t = this.state.open_time - this.state.seconds;
    }

    var h = Math.floor(t / 3600);
    var m = Math.floor((t - (h*3600)) / 60);
    var s = Math.floor(t - h * 3600 - m* 60);

    return(
      <div className='Timer'>
        {zeroPad(h,2)}:{zeroPad(m,2)}:{zeroPad(s,2)}
      </div>
    )
    }

  showImage(){
    if (this.state.open === 1){
      return(
        <img src={luefter} className="Luefter-logo" alt="logo" />
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
        {this.showImage()}
        {this.formatTime()}
        <p>Open for 
        <select id="lang" onChange={this.setTimeOpen} value={this.state.value}>
                  <option value={20}>debug</option>
                  <option value={5*60}>5 min</option>
                  <option value={10*60}>10 min</option>
                  <option value={15*60}>15 min</option>
                  <option value={20*60}>20 min</option>
               </select>
        </p>
        <p>Close for 
        <select id="lang" onChange={this.setTimeClose} value={this.state.value}>
                  <option value={20}>debug</option>
                  <option value={20*60}>20 min</option>
                  <option value={40*60}>40 min</option>
                  <option value={60*60}>60 min</option>
                  <option value={80*60}>80 min</option>
                  <option value={100*60}>100 min</option>
                  <option value={120*60}>120 min</option>
               </select>
        </p>
        <button onClick={() => this.startTimer()}>
          Start
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
