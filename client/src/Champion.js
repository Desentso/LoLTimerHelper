import React, { Component } from 'react';
import SummonerSpell from "./SummonerSpell.js";

class Champion extends Component {

  render() {
   	
   	let summonerSpellsFloat = "none";
    if (this.props.side == "red") {
    	summonerSpellsFloat = "left";
    }

    return (
      <div className="Champion">

        <img className="championIcon" src={this.props.data.championIcon} />

        <div className="summonerSpells" style={{float: summonerSpellsFloat}}>
        	<SummonerSpell data={this.props.data.summonerSpells[0]} championName={this.props.data.name} />
        	<SummonerSpell data={this.props.data.summonerSpells[1]} championName={this.props.data.name} />
        </div>

      </div>
    );
  }
}

export default Champion;