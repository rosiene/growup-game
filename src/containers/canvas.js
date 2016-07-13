import React from 'react';

class Canvas extends React.Component {

  area(){
    var canvas = document.getElementById("board");
    var ctx = canvas.getContext("2d");
  }

  render(){
    return(
      <canvas style={{border: "1px solid #000"}} id="board" width="1000px" height="600px" />
    )
  }
}

export default Canvas;
