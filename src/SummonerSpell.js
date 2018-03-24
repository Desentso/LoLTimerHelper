import React, { Component } from 'react';

class SummonerSpell extends Component {

  render() {
    return (
      <div className="SummonerSpell">
      	<img src={this.props.data.icon} />
      </div>
    );
  }
}

export default SummonerSpell;
