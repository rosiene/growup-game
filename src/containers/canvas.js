import React from 'react';

class Canvas extends React.Component {
  constructor() {
  super();

  this.style = {
    border: "1px solid #000",
    position: 'fixed',
    top: 105,
    height: 600,
    width: 1000
  };
}

  area(){
    var canvas = document.getElementById("board");
    var ctx = canvas.getContext("2d");
  }

  render(){
    return(
      <canvas style={this.style} id="board" />
    )
  }
}

export default Canvas;
