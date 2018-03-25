import React, { Component } from 'react';

class SummonerSpell extends Component {

	constructor(props) {
		super(props);
		this.state = {
			minutes: null,
			seconds: null,
			timerInterval: null
		}
	}

	setTimer = () => {

		if (this.state.timerInterval) {

		} else {

			this.setState({minutes: 0, seconds: 20});

			const timerInterval = setInterval(() => {

				const seconds = this.state.seconds;
				const minutes = this.state.minutes;

				if (seconds > 0) {

					this.setState({seconds: seconds - 1})
				} else if (seconds === 0 && minutes > 0) {
					console.log(minutes, seconds);
					this.setState({minutes: minutes - 1, seconds: 59});
				} else if (seconds === 0 && minutes === 0){

					clearInterval(this.state.timerInterval);
					this.setState({timerInterval: null, seconds: null, minutes: null})
				}

				if (minutes === 0 && seconds === 18) {
					const msg = new SpeechSynthesisUtterance(this.props.championName + "'s " + this.props.data.name + " is up in 15 seconds.");
					window.speechSynthesis.speak(msg);
				} else if (minutes === 0 && seconds === 3) {
					const msg = new SpeechSynthesisUtterance(this.props.championName + "'s " + this.props.data.name + " is up.");
					window.speechSynthesis.speak(msg);
				}
			}, 1000);

			this.setState({timerInterval: timerInterval});
		}

	}

  render() {

  	let displayTimer = "none";
  	let timerString = this.state.minutes + ":" + this.state.seconds;
  	if (this.state.timerInterval) {
  		displayTimer = "block";
  		if (this.state.seconds < 10) {
  			timerString = this.state.minutes + ":0" + this.state.seconds;
  		}
  	}

    return (
      <div className="SummonerSpell" onClick={this.setTimer}>
      	<img src={this.props.data.icon} />
      	<div className="timer" style={{display: displayTimer}}>
      		<span className="timerText">{timerString}</span>
      	</div>
      </div>
    );
  }
}

export default SummonerSpell;
