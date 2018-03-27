import React, { Component } from 'react';

class InputField extends Component {
  constructor(props){
    super(props);
  }

  render() {
    let className = this.props.className || "input";
    let displayError = "none";

    if (this.props.error){

      className = className + " error";
      displayError = "block";
    }

    return (
      <span>
        <input id={this.props.id} className={className} style={this.props.style} type={this.props.type} value={this.props.value} name={this.props.name} min={this.props.min} max={this.props.max} step={this.props.step} onClick={this.props.onClick} onChange={this.props.onChange} autoComplete={this.props.autocomplete}/>
        <span className="inputErrorText" style={{display: displayError}}>{this.props.errorText} </span>
      </span>
    )
  }
}

export default InputField;