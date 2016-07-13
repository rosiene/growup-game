import React from 'react';
import Player from './Player';

class Svg extends React.Component {

  area(){
    var canvas = document.getElementById("board");
    var ctx = canvas.getContext("2d");
  }

  render(){
    return(
      <svg id="board" style={{border: "1px solid #000"}} id="board" width="1000px" height="600px">
        <Player />
      </svg>
    )
  }
}

export default Svg;
