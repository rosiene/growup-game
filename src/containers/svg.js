import React from 'react';
import Player from './player';
import HeaderBar from '../components/headerbar';

class Svg extends React.Component {

  constructor(){
    super();

    this.style = {
      top: 100,
    };

    this.svgstyle = {
      position: 'fixed',
      border: '1px solid red',
      top: 100,
    };
    this.state = {
      foods: [],
      player: {r: "20",
              cx: 20,
              cy: 20,
              fill: "blue",
              food_eaten: "0",
              time_alive: "0",
              speed: "0"}
    };
  }

  area(){
    var canvas = document.getElementById("board");
    var ctx = canvas.getContext("2d");
  }

  render(){
    console.log(this.state.player);
    return(
      <div>
        <HeaderBar player={this.state.player} />
        <div style={this.style}>
          <svg id="board"  style={this.svgstyle} width="1000" height="600">
            <Player />
          </svg>
        </div>
      </div>
    )
  }
}

export default Svg;
