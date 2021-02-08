import React, { Component } from "react";
import "./styles.css";
import data from "./data";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      duration: 0,
      currentTime: 0,
      currentSong: data[0]
    };
    this.audio = React.createRef();
    this.handlePlay = this.handlePlay.bind(this);
    this.handleLoadData = this.handleLoadData.bind(this);
    this.handleSeekbarChange = this.handleSeekbarChange.bind(this);
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    this.setNextSong = this.setNextSong.bind(this);
    this.setPrevSong = this.setPrevSong.bind(this);
  }
  setNextSong() {
    if (data[this.state.currentSong.id + 1]) {
      this.setState(
        {
          currentSong: data[this.state.currentSong.id + 1],
          duration: 0,
          currentTime: 0
        },
        () => {
          this.state.isPlaying
            ? this.audio.current.play()
            : this.audio.current.pause();
        }
      );
    } else {
      this.setState(
        { currentSong: data[0], duration: 0, currentTime: 0 },
        () => {
          this.state.isPlaying
            ? this.audio.current.play()
            : this.audio.current.pause();
        }
      );
    }
  }
  setPrevSong() {
    if (data[this.state.currentSong.id - 1]) {
      this.setState(
        {
          currentSong: data[this.state.currentSong.id - 1],
          duration: 0,
          currentTime: 0
        },
        () => {
          this.state.isPlaying
            ? this.audio.current.play()
            : this.audio.current.pause();
        }
      );
    } else {
      this.setState(
        { currentSong: data[data.length - 1], duration: 0, currentTime: 0 },
        () => {
          this.state.isPlaying
            ? this.audio.current.play()
            : this.audio.current.pause();
        }
      );
    }
  }
  handleTimeUpdate() {
    this.setState({
      currentTime: Math.round(this.audio.current.currentTime)
    });
  }
  handlePlay() {
    this.setState(
      (state) => {
        return { isPlaying: !state.isPlaying };
      },
      () => {
        this.state.isPlaying
          ? this.audio.current.play()
          : this.audio.current.pause();
      }
    );
  }
  handleLoadData() {
    this.setState({
      duration: Math.round(this.audio.current.duration)
    });
  }
  handleSeekbarChange(e) {
    this.setState(
      {
        currentTime: Math.round(e.target.value)
      },
      () => {
        if (!isNaN(this.audio.current.duration)) {
          this.audio.current.currentTime = this.state.currentTime;
        }
      }
    );
  }
  render() {
    return (
      <div className="app">
        <div className="screen">
          <div className="song-img">
            <img src={this.state.currentSong.imgUrl} alt="Album Art" />
          </div>
          <div className="song-info">
            <p>{this.state.currentSong.name}</p>
            <p>{this.state.currentSong.artist}</p>
          </div>
          <audio
            ref={this.audio}
            src={this.state.currentSong.audioUrl}
            onLoadedData={this.handleLoadData}
            onTimeUpdate={this.handleTimeUpdate}
            onEnded={this.setNextSong}
          >
            Your browser does not support Audio!
          </audio>
          <div className="song-seekbar">
            <input
              type="range"
              value={this.state.currentTime}
              max={this.state.duration}
              onChange={this.handleSeekbarChange}
            />
          </div>
          <div className="controls">
            <i
              className={`fas fa-step-backward`}
              onClick={this.setPrevSong}
            ></i>
            <i
              className={`fas fa-${
                this.state.isPlaying ? "pause" : "play"
              }-circle`}
              onClick={this.handlePlay}
            ></i>
            <i className={`fas fa-step-forward`} onClick={this.setNextSong}></i>
          </div>
        </div>
      </div>
    );
  }
}
