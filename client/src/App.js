import React, { Component } from 'react';
import './App.css';

import Champions from "./Champions.js";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: []
    }
  }

  componentWillMount() {
    this.getData();
  }

  getData() {
    fetch("")
    .then(resp => resp.json())
    .then(data => {

      console.log(data);
    })
    .catch(err => console.log(err));
  }

  render() {

    let blueChampions = [
      {name: "Mundo", championIcon: "#", summonerSpells: [{name: "Flash", icon: "#"}, {name: "Teleport", icon: "#"}]},
      {name: "Kha'Zix", championIcon: "#", summonerSpells: [{name: "Flash", icon: "#"}, {name: "Smite", icon: "#"}]},
      {name: "Ziggs", championIcon: "#", summonerSpells: [{name: "Flash", icon: "#"}, {name: "Ignite", icon: "#"}]},
      {name: "Tristana", championIcon: "#", summonerSpells: [{name: "Flash", icon: "#"}, {name: "Heal", icon: "#"}]},
      {name: "Thresh", championIcon: "#", summonerSpells: [{name: "Flash", icon: "#"}, {name: "Exhaust", icon: "#"}]},
    ];

    let redChampions = [
      {name: "Mundo", championIcon: "#", summonerSpells: [{name: "Flash", icon: "#"}, {name: "Teleport", icon: "#"}]},
      {name: "Kha'Zix", championIcon: "#", summonerSpells: [{name: "Flash", icon: "#"}, {name: "Smite", icon: "#"}]},
      {name: "Ziggs", championIcon: "#", summonerSpells: [{name: "Flash", icon: "#"}, {name: "Ignite", icon: "#"}]},
      {name: "Tristana", championIcon: "#", summonerSpells: [{name: "Flash", icon: "#"}, {name: "Heal", icon: "#"}]},
      {name: "Thresh", championIcon: "#", summonerSpells: [{name: "Flash", icon: "#"}, {name: "Exhaust", icon: "#"}]},
    ];

    return (
      <div className="App">
        <h1>Test</h1>

        <Champions side="blue" champions={blueChampions} />
        <Champions side="red" champions={redChampions} />
      </div>
    );
  }
}

export default App;
