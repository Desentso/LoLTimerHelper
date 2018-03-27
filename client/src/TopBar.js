import React, { Component } from 'react';
import './App.css';

import InputField from "./InputField.js";

class TopBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      summonerName: null,
      nameError: false,
      nameErrorText: null
    }
  }

  summonerNameOnChange = e => this.setState({summonerName: e.target.value, nameError: false})


  getData = () => {
    
    if (this.state.summonerName) {
      fetch("/getMatchData?summonerName=" + this.state.summonerName)
      .then(resp => {
        if (resp.status === 200){
          return resp.json();
        } else if (resp.status === 404) {
          this.setState({nameError: true, nameErrorText: "Summoner Name Not Found"});
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
          <span>I</span>
        </div>
      </div>
    );
  }
}

export default TopBar;
