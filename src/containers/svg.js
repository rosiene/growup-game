import React from 'react';
import Player from './player';
import Food from './food';

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

  renderFood(food, index){
    return (<Food key={index}
            cx={food.x} cy={food.y} />);
  }

  render() {
    return(
      <svg id="board" style={{border: "1px solid #000"}} id="board" width="1000px" height="600px">
        { this.foods().map(this.renderFood) }
        <Player />
      </svg>
    )
  }
}

export default Svg;
