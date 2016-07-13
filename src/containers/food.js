import React from 'react';

class Food extends React.Component {

  drawSquare(x, y){
    var c = document.getElementById("board");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.rect(x, y, 10, 10);
    ctx.stroke();
    }

    newSquare(){
      var i = 0;
      for (i = 0; i < 100; i++){
        var x = Math.floor(Math.random() * 990);
        var y = Math.floor(Math.random() * 590);
        console.log(x + " " + y);
        this.drawSquare(x, y)
      }
    }

    window.addEventListener('mousemove', (event) => {
     this.updatePosition(event.clientX, event.clientY);
   });

    componentDidMount() {
      this.newSquare();
    }

    render(){
      return(
        <canvas id="board" style={{border: "1px solid #000"}} id="board" width="1000px" height="600px" />
      );
    }
  }

export default Food;
