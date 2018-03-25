import React, { Component } from 'react';
import Champion from "./Champion.js";

class Champions extends Component {

  render() {

  	let champions = [];

  	for (let i = 0; i < this.props.champions.length; i++) {
  		champions.push(<Champion data={this.props.champions[i]} side={this.props.side} />);
  	}

    return (
      <div className={"side " + this.props.side}>
     	{champions}
      </div>
    );
  }
}

export default Champions;
