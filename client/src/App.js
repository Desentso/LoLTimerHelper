import React, { Component } from 'react';
import './App.css';

import Champions from "./Champions.js";
import OtherCooldown from "./OtherCooldown.js";
import TopBar from "./TopBar.js";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      blueChampions: [
        {name: "Champion", championIcon: {full: "Teemo.png"}, summonerSpells: [{name: "Summoner Spell", icon: {full: "SummonerDarkStarChampSelect2.png"}, cooldown: 65}, {name: "Summoner Spell", icon: {full: "SummonerDarkStarChampSelect2.png"}, cooldown: 65}]},
        {name: "Champion", championIcon: {full: "Teemo.png"}, summonerSpells: [{name: "Summoner Spell", icon: {full: "SummonerDarkStarChampSelect2.png"}, cooldown: 65}, {name: "Summoner Spell", icon: {full: "SummonerDarkStarChampSelect2.png"}, cooldown: 65}]},
        {name: "Champion", championIcon: {full: "Teemo.png"}, summonerSpells: [{name: "Summoner Spell", icon: {full: "SummonerDarkStarChampSelect2.png"}, cooldown: 65}, {name: "Summoner Spell", icon: {full: "SummonerDarkStarChampSelect2.png"}, cooldown: 65}]},
        {name: "Champion", championIcon: {full: "Teemo.png"}, summonerSpells: [{name: "Summoner Spell", icon: {full: "SummonerDarkStarChampSelect2.png"}, cooldown: 65}, {name: "Summoner Spell", icon: {full: "SummonerDarkStarChampSelect2.png"}, cooldown: 65}]},
        {name: "Champion", championIcon: {full: "Teemo.png"}, summonerSpells: [{name: "Summoner Spell", icon: {full: "SummonerDarkStarChampSelect2.png"}, cooldown: 65}, {name: "Summoner Spell", icon: {full: "SummonerDarkStarChampSelect2.png"}, cooldown: 65}]},
      ],
      redChampions: [
        {name: "Champion", championIcon: {full: "Teemo.png"}, summonerSpells: [{name: "Summoner Spell", icon: {full: "SummonerDarkStarChampSelect2.png"}, cooldown: 65}, {name: "Summoner Spell", icon: {full: "SummonerDarkStarChampSelect2.png"}, cooldown: 65}]},
        {name: "Champion", championIcon: {full: "Teemo.png"}, summonerSpells: [{name: "Summoner Spell", icon: {full: "SummonerDarkStarChampSelect2.png"}, cooldown: 65}, {name: "Summoner Spell", icon: {full: "SummonerDarkStarChampSelect2.png"}, cooldown: 65}]},
        {name: "Champion", championIcon: {full: "Teemo.png"}, summonerSpells: [{name: "Summoner Spell", icon: {full: "SummonerDarkStarChampSelect2.png"}, cooldown: 65}, {name: "Summoner Spell", icon: {full: "SummonerDarkStarChampSelect2.png"}, cooldown: 65}]},
        {name: "Champion", championIcon: {full: "Teemo.png"}, summonerSpells: [{name: "Summoner Spell", icon: {full: "SummonerDarkStarChampSelect2.png"}, cooldown: 65}, {name: "Summoner Spell", icon: {full: "SummonerDarkStarChampSelect2.png"}, cooldown: 65}]},
        {name: "Champion", championIcon: {full: "Teemo.png"}, summonerSpells: [{name: "Summoner Spell", icon: {full: "SummonerDarkStarChampSelect2.png"}, cooldown: 65}, {name: "Summoner Spell", icon: {full: "SummonerDarkStarChampSelect2.png"}, cooldown: 65}]},
      ],
      summonerName: null,
      volume: 0.5
    }
  }

  componentWillMount() {

    let params = window.location.href.split("?")
    if (params) {
      params = params[params.length - 1].split("&");
      for (let i = 0; i < params.length; i++){
        const comps = params[i].split("=");
        const key = comps[0];
        const value = comps[1];

        if (key === "summonername") {
          
          fetch("/getMatchData?summonerName=" + value)
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
            this.setState({blueChampions: data.blueSide, redChampions: data.redSide});
          })
          .catch(err => console.log(err));
          }
      }
    }

  }

  setData = (blueChampions, redChampions) => {
    this.setState({blueChampions: blueChampions, redChampions: redChampions});
  }

  setVolume = (volume) => {
    this.setState({volume: volume});
  }

  render() {

    let blueChampions = this.state.blueChampions;
    let redChampions = this.state.redChampions;

    return (
      <div className="App">

        <TopBar afterData={this.setData} setVolume={this.setVolume} />

        <Champions side="blue" champions={blueChampions} volume={this.state.volume}/>

        <div className="mapArea">

          <div>
            <OtherCooldown type="baron" id="baron" cooldown={420} volume={this.state.volume} icon="https://img1.wikia.nocookie.net/__cb20140620025404/leagueoflegends/images/3/38/Baron_NashorSquare.png" />
            <OtherCooldown type="dragon" id="dragon" cooldown={360} volume={this.state.volume} icon="https://img1.wikia.nocookie.net/__cb20140620025407/leagueoflegends/images/c/c9/DragonSquare.png" />

            <OtherCooldown type="red side Red" id="redRed" cooldown={300} volume={this.state.volume} icon="https://img2.wikia.nocookie.net/__cb20140620025406/leagueoflegends/images/e/e7/Red_BramblebackSquare.png" />
            <OtherCooldown type="red side Blue" id="redBlue" cooldown={300} volume={this.state.volume} icon="https://img3.wikia.nocookie.net/__cb20140620025405/leagueoflegends/images/8/85/Blue_SentinelSquare.png" />

            <OtherCooldown type="blue side Red" id="blueRed" cooldown={300} volume={this.state.volume} icon="https://img2.wikia.nocookie.net/__cb20140620025406/leagueoflegends/images/e/e7/Red_BramblebackSquare.png" />
            <OtherCooldown type="blue side Blue" id="blueBlue" cooldown={300} volume={this.state.volume} icon="https://img3.wikia.nocookie.net/__cb20140620025405/leagueoflegends/images/8/85/Blue_SentinelSquare.png" />
          </div>
        </div>

        <Champions side="red" champions={redChampions} volume={this.state.volume}/>
      </div>
    );
  }
}

export default App;