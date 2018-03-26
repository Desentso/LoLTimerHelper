import React, { Component } from 'react';
import './App.css';

import Champions from "./Champions.js";
import OtherCooldown from "./OtherCooldown.js";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      blueChampions: [],
      redChampions: [],
      summonerName: null
    }
  }

  componentWillMount() {
    //this.getData();
  }

  summonerNameOnChange = e => this.setState({summonerName: e.target.value})

  getData = () => {
    
    if (this.state.summonerName) {
      fetch("/getMatchData?summonerName=" + this.state.summonerName)
      .then(resp => {
        if (resp.status === 200){
          return resp.json();
        } else if (resp.status === 404) {
          this.setState({error: "Summoner Name Not Found"});
        }
      })
      .then(data => {

        console.log(data);
        this.setState({blueChampions: data.blueSide, redChampions: data.redSide});
      })
      .catch(err => console.log(err));
    }
  }

  render() {

    let blueChampions = this.state.blueChampions; /*[
      {name: "Mundo", championIcon: "#", summonerSpells: [{name: "Flash", icon: "#"}, {name: "Teleport", icon: "#"}]},
      {name: "Kha'Zix", championIcon: "#", summonerSpells: [{name: "Flash", icon: "#"}, {name: "Smite", icon: "#"}]},
      {name: "Ziggs", championIcon: "#", summonerSpells: [{name: "Flash", icon: "#"}, {name: "Ignite", icon: "#"}]},
      {name: "Tristana", championIcon: "#", summonerSpells: [{name: "Flash", icon: "#"}, {name: "Heal", icon: "#"}]},
      {name: "Thresh", championIcon: "#", summonerSpells: [{name: "Flash", icon: "#"}, {name: "Exhaust", icon: "#"}]},
    ];*/

    let redChampions = this.state.redChampions; /*[
      {name: "Mundo", championIcon: "#", summonerSpells: [{name: "Flash", icon: "#"}, {name: "Teleport", icon: "#"}]},
      {name: "Kha'Zix", championIcon: "#", summonerSpells: [{name: "Flash", icon: "#"}, {name: "Smite", icon: "#"}]},
      {name: "Ziggs", championIcon: "#", summonerSpells: [{name: "Flash", icon: "#"}, {name: "Ignite", icon: "#"}]},
      {name: "Tristana", championIcon: "#", summonerSpells: [{name: "Flash", icon: "#"}, {name: "Heal", icon: "#"}]},
      {name: "Thresh", championIcon: "#", summonerSpells: [{name: "Flash", icon: "#"}, {name: "Exhaust", icon: "#"}]},
    ];*/

    return (
      <div className="App">

        <div>
          <label>Summoner Name: </label>
          <input type="text" onChange={this.summonerNameOnChange}/>
          <button onClick={this.getData}>Get Data</button>
        </div>

        <Champions side="blue" champions={blueChampions} />

        <div className="mapArea">

          <img src="/images/lolmap.png" id="map" />

          <div>

              <OtherCooldown type="baron" id="baron" cooldown={420} icon="http://img1.wikia.nocookie.net/__cb20140620025404/leagueoflegends/images/3/38/Baron_NashorSquare.png" />
              <OtherCooldown type="dragon" id="dragon" cooldown={360} icon="http://img1.wikia.nocookie.net/__cb20140620025407/leagueoflegends/images/c/c9/DragonSquare.png" />

              <OtherCooldown type="red side Red" id="redRed" cooldown={300} icon="http://img2.wikia.nocookie.net/__cb20140620025406/leagueoflegends/images/e/e7/Red_BramblebackSquare.png" />
              <OtherCooldown type="red side Blue" id="redBlue" cooldown={300} icon="http://img3.wikia.nocookie.net/__cb20140620025405/leagueoflegends/images/8/85/Blue_SentinelSquare.png" />

              <OtherCooldown type="blue side Red" id="blueRed" cooldown={300} icon="http://img2.wikia.nocookie.net/__cb20140620025406/leagueoflegends/images/e/e7/Red_BramblebackSquare.png" />
              <OtherCooldown type="blue side Blue" id="blueBlue" cooldown={300} icon="http://img3.wikia.nocookie.net/__cb20140620025405/leagueoflegends/images/8/85/Blue_SentinelSquare.png" />

          </div>
        </div>

        <Champions side="red" champions={redChampions} />
      </div>
    );
  }
}

export default App;
/*
<div style={{height: "300px"}}>
              <OtherCooldown type="baron" id="baron" cooldown={420} icon="http://img1.wikia.nocookie.net/__cb20140620025404/leagueoflegends/images/3/38/Baron_NashorSquare.png" />
              <OtherCooldown type="dragon" id="dragon" cooldown={360} icon="http://img1.wikia.nocookie.net/__cb20140620025407/leagueoflegends/images/c/c9/DragonSquare.png" />
            </div>

            <div style={{float: "right"}}>
              <OtherCooldown type="red Side Red" id="redRed" cooldown={300} icon="http://img2.wikia.nocookie.net/__cb20140620025406/leagueoflegends/images/e/e7/Red_BramblebackSquare.png" />
              <OtherCooldown type="red Side Blue" id="redBlue" cooldown={300} icon="http://img3.wikia.nocookie.net/__cb20140620025405/leagueoflegends/images/8/85/Blue_SentinelSquare.png" />
            </div>

            <div>
              <OtherCooldown type="blue Side Red" id="blueRed" cooldown={300} icon="http://img2.wikia.nocookie.net/__cb20140620025406/leagueoflegends/images/e/e7/Red_BramblebackSquare.png" />
              <OtherCooldown type="blue Side Blue" id="blueBlue" cooldown={300} icon="http://img3.wikia.nocookie.net/__cb20140620025405/leagueoflegends/images/8/85/Blue_SentinelSquare.png" />
            </div>

            */