import React from 'react';
import _ from 'lodash';

class HeaderBar extends React.Component{

  constructor(){
    super();

    this.baseStyle = ({
      backgroundColor: "#9CCC65",
      color: "#FAFAFA",
      position: "fixed",
      height: 50,
      top: 0,
      left: 0,
      right: 0,
      margin: 0,
      padding: "5px 5px",
      boxShadow: "1px 1px 5px rgba(0,0,0,0.3)",
    });
    this.first = ({
      float: "left",
      width: 400,
      fontSize: 40,
      fontWeight: 'bold',
    });
    this.second = ({
      float: "left",
      width: 200,
      textAlign: 'center',
      fontWeight: 'bold',
    });
  }

  render() {
    return (
      <div style={this.baseStyle}>
        <div style={this.first}>Grow Up!</div>
        <div style={this.second}>Food Eaten:
        <br/>{this.props.food_eaten}</div>
        <div style={this.second}>Time Alive:
        <br/>{this.props.time_alive}</div>
        <div style={this.second}>Speed:
        <br/>{this.props.speed}</div>
      </div>
    );
  }

}

export default HeaderBar;
