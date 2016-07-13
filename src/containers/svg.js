import React from 'react';
import Player from './player';

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

  }

  area(){
    var canvas = document.getElementById("board");
    var ctx = canvas.getContext("2d");
  }

  render(){
    return(
      <div style={this.style}>
        <svg id="board"  style={this.svgstyle} width="1000" height="600">
          <Player />
        </svg>
      </div>
    )
  }
}

export default Svg;
