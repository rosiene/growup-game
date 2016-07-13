import React from 'react';
import Player from './player';
<<<<<<< HEAD
import Food from './food';
=======
>>>>>>> 068e2b904a192572be0e0a52f1f67e9d6bbda704

class Svg extends React.Component {
  
  foods(){
    let foods = [];
    for (let i = 0; i < 100; i++){
      let x = Math.floor(Math.random() * 990);
      let y = Math.floor(Math.random() * 590);
      foods.push({x: x, y: y});
    }
    return foods;
  }

<<<<<<< HEAD
  renderFood(food, index){
    return (<Food key={index}
            cx={food.x} cy={food.y} />);
=======
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
>>>>>>> 068e2b904a192572be0e0a52f1f67e9d6bbda704
  }

  render() {
    return(
<<<<<<< HEAD
      <svg id="board" style={{border: "1px solid #000"}} id="board" width="1000px" height="600px">
        { this.foods().map(this.renderFood) }
        <Player />
      </svg>
=======
      <div style={this.style}>
        <svg id="board"  style={this.svgstyle} width="1000" height="600">
          <Player />
        </svg>
      </div>
>>>>>>> 068e2b904a192572be0e0a52f1f67e9d6bbda704
    )
  }
}

export default Svg;
