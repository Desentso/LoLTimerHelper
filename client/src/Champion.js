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

        <img className="championIcon" src={"https://ddragon.leagueoflegends.com/cdn/8.6.1/img/champion/" + this.props.data.championIcon.full} />

        <div className="summonerSpells" style={{float: summonerSpellsFloat}}>
        	<SummonerSpell data={this.props.data.summonerSpells[0]} championName={this.props.data.name} volume={this.props.volume} />
        	<SummonerSpell data={this.props.data.summonerSpells[1]} championName={this.props.data.name} volume={this.props.volume} />
        </div>

      </div>
    );
  }
}

export default Champion;
