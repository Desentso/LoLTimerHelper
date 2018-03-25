import React, { Component } from 'react';

class OtherCooldown extends Component {

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

			let minutes = Math.floor(this.props.data.cooldown / 60);
			let seconds = Math.floor(((this.props.data.cooldown / 60) - minutes) * 60);

			this.setState({minutes: minutes, seconds: seconds});

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

				if (minutes === 1 && seconds === 2){
					const msg = new SpeechSynthesisUtterance(this.props.type + " is up in 1 minute.");
					msg.rate = 1.5;
					window.speechSynthesis.speak(msg);
				} else if (minutes === 0 && seconds === 17) {
					const msg = new SpeechSynthesisUtterance(this.props.type + " is up in 15 seconds.");
					msg.rate = 1.5;
					window.speechSynthesis.speak(msg);
				} else if (minutes === 0 && seconds === 2) {
					const msg = new SpeechSynthesisUtterance(this.props.type + " is up.");
					msg.rate = 1.5;
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
      <div className="OtherCooldown" onClick={this.setTimer}>
      	<img className="spellIcon" src={"http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/" + this.props.icon} />
      	<div className="timer" style={{display: displayTimer}}>
      		<span className="timerText">{timerString}</span>
      	</div>
      </div>
    );
  }
}

export default OtherCooldown;
