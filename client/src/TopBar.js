import React, { Component } from 'react';
import './App.css';

import InputField from "./InputField.js";

class TopBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      summonerName: null,
      nameError: false,
      nameErrorText: null,
      displayInfo: "none",
      displayVolume: "none",
      volume: 0.5
    }
  }

  summonerNameOnChange = e => this.setState({summonerName: e.target.value, nameError: false})

  rangeChange = e => {

    e.target.style.backgroundImage = "-webkit-gradient( linear,left top,right top,color-stop(" + (e.target.value) + ", #32868c),color-stop(" + (e.target.value) + ", #dddddd)";
    const volume = e.target.value;
    this.props.setVolume(volume);
    this.setState({volume: volume});
  }

  getData = e => {
      
    e.target.blur();  

    if (this.state.summonerName) {
      window.history.pushState({}, "", "/?summonername="+ this.state.summonerName)
      fetch("/getMatchData?summonerName=" + this.state.summonerName)
      .then(resp => {
        if (resp.status === 200){
          return resp.json();
        } else if (resp.status === 404) {
          this.setState({nameError: true, nameErrorText: "Summoner Name Not Found"});
        } else if (resp.status === 400) {
          this.setState({nameError: true, nameErrorText: "Summoner Is Not In Game"});
        }
      })
      .then(data => {

        console.log(data);
        this.props.afterData(data.blueSide, data.redSide);
      })
      .catch(err => console.log(err));
    } else {
      this.setState({nameError: true, nameErrorText: "You have to enter a summoner name"});
    }
  }


  toggleInfo = () => {
    if (this.state.displayInfo == "none") {
      this.setState({displayInfo: "block"});
    } else {
      this.setState({displayInfo: "none"});
    }
  }

  toggleVolumeSlider = () => {
    if (this.state.displayVolume == "none") {
      this.setState({displayVolume: "block"});
    } else {
      this.setState({displayVolume: "none"});
    }
  }

  render() {

    return (
      <div className="TopBar">
        <div className="inputArea">
          <label>Summoner Name: </label>
          <InputField type="text" onChange={this.summonerNameOnChange} error={this.state.nameError} errorText={this.state.nameErrorText} />
          <button onClick={this.getData} className="submit">Get Data</button>
        </div>

        <h1 className="title">LoL Timer Helper</h1>

        <div className="settingsArea">

          <img src="/images/volume.png" className="infoImg" onClick={this.toggleVolumeSlider} />
          <div style={{display: this.state.displayVolume, width: "unset"}} className="infoArea">
            <InputField type="range" min="0" max="1" step="0.05" value={this.state.volume} onChange={this.rangeChange} className="rangeInput" />
          </div>

          <img src="/images/info.png" className="infoImg" onClick={this.toggleInfo} />
          <div className="infoArea" style={{display: this.state.displayInfo}}>
            <p className="sectionTitle">What Is LoL Timer Helper?</p>
            <p className="sectionText">LoL Timer Helper is a tool that helps you track summoner spell cooldowns, jungle buffs and dragon/baron spawn times.</p>

            <p className="sectionTitle" style={{marginTop: "30px"}}>How To Use?</p>
            <p className="sectionText">First you have to enter a summoner name to get the current match information. After this you will see all the champions in your game. When a champion uses a summoner spell, you <strong>click on the summoner spell and a timer starts.</strong>
            <br/><br/> 
            If you missclick, <strong>you can cancel the timer by right-clicking it.</strong>
            <br/><br/> 
            The app notifies you at certain points, for example "Teemo's flash is up in 1 minute", by speaking it aloud. Same applies to jungle buffs and dragon/baron.        
            </p>

            <p className="sectionTitle" style={{marginTop: "30px"}}>Made By</p>
            <p className="sectionText"><a href="https://desentso.github.io" style={{color: "#32868c"}}>Desentso</a></p>
          </div>
        </div>
      </div>
    );
  }
}

export default TopBar;
