import React from 'react';
import Player from './player';
import Header from './header';
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

    this.state = {
      foods: [],
      player: {
        r: "20",
        cx: 20,
        cy: 20,
        fill: "blue",
        name: "Username",
        food_eaten: 0,
        time_alive: 0,
        speed: 0
      }
    };
  }

  updatePositionPlayer(x, y){
    this.setState({
      player: {
        r: "20",
        cx: x,
        cy: y - 100,
        fill: "blue",
        name: "Username",
        food_eaten: 0,
        time_alive: 0,
        speed: 0
      }
    });
  }

  componentDidMount() {
    window.addEventListener('mousemove', (event) => {
      this.updatePositionPlayer(event.clientX, event.clientY);
    });
    this.createFoods();
  }

  createFoods(){
    let tempFoods = [];
    for (let i = 0; i < 100; i++){
      let x = Math.floor(Math.random() * 990);
      let y = Math.floor(Math.random() * 590);
      tempFoods.push({x: x, y: y});
    }
    this.setState({
      foods: tempFoods
    });

  }

  renderFood(food, index){
    return (<Food key={index} cx={food.x} cy={food.y} />);
  }


  render(){
    return(
    <div>
      <Header player={this.state.player} />
      <div style={this.style}>
        <svg id="board"  style={this.svgstyle} width="1000" height="600">
          { this.state.foods.map(this.renderFood) }
          <Player player={this.state.player} />
        </svg>
      </div>
    </div>
    );
  }
}

export default Svg;
