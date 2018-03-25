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

        <div>
          <OtherCooldown type="baron" cooldown={420} icon="#" />
          <OtherCooldown type="dragon" cooldown={360} icon="#" />
        </div>

        <div>
          <OtherCooldown type="red Side Red" cooldown={300} icon="#" />
          <OtherCooldown type="red Side Blue" cooldown={300} icon="#" />
        </div>

        <div>
          <OtherCooldown type="blue Side Blue" cooldown={300} icon="#" />
          <OtherCooldown type="blue Side Red" cooldown={300} icon="#" />
        </div>

        <Champions side="red" champions={redChampions} />
      </div>
    );
  }
}

export default App;
