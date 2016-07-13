import React from 'react';
import Player from './player';
import Food from './food';

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
      <div style={this.style}>
        <svg id="board"  style={this.svgstyle} width="1000" height="600">
          { this.foods().map(this.renderFood) }
          <Player />
        </svg>
      </div>
    );
  }
}

export default Svg;
