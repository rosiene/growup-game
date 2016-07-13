import React from 'react';
import _ from 'lodash';

class HeaderBar extends React.Component{

  constructor(){
    super();

    this.baseStyle = ({
      backgroundColor: "#9CCC65",
      color: "#FAFAFA",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      margin: 0,
      padding: "5px 5px",
      boxShadow: "1px 1px 5px rgba(0,0,0,0.3)",
    });
    this.first = ({
      float: "left",
      width: "400px",
    });
    this.second = ({
      float: "left",
      width: "200px",
      textAlign: 'center'
    });
  }

  render() {
    return (
      <div style={this.baseStyle}>
        <div style={this.first}><h1>Grow Up!</h1></div>
        <div style={this.second}>Food Eaten:
        <br/>50</div>
        <div style={this.second}>Time Alive:
        <br/>50</div>
        <div style={this.second}>Speed:
        <br/>50</div>
      </div>
    );
  }

}

export default HeaderBar;
