import React from 'react';
import Player from './player';
import Header from './header';
import Food from './food';


class Svg extends React.Component {

  constructor(){
    super();

    this.style = {
      top: 70,
    };

    this.svgstyle = {
      position: 'fixed',
      border: '1px solid red',
      top: 70,
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

  updateGame(x, y){
    let ate = this.eatFood(x, y);
    ate = ate + parseInt(this.state.player.food_eaten);

    this.setState({
      player: {
        r: "20",
        cx: x,
        cy: y - 70,
        fill: "blue",
        name: "Username",
        food_eaten: ate,
        time_alive: 0,
        speed: 0
      }
    });
  }

  eatFood(x, y){
    let ate = 0;
    let tempFoods = [];
    for (let i = 0; i < this.state.foods.length; i++){

      let food = this.state.foods[i];
      let player = this.state.player;

      let startXFood = parseInt(food.cx) - parseInt(food.r);
      let startYFood = parseInt(food.cy) - parseInt(food.r);
      let endXFood = parseInt(food.cx) + parseInt(food.r);
      let endYFood = parseInt(food.cy) + parseInt(food.r);

      let startXPlayer = parseInt(player.cx) - parseInt(player.r);
      let startYPlayer = parseInt(player.cy) - parseInt(player.r);
      let endXPlayer = parseInt(player.cx) + parseInt(player.r);
      let endYPlayer = parseInt(player.cy) + parseInt(player.r);

      if (startXPlayer < startXFood &&
          startYPlayer < startYFood &&
          endXPlayer > endXFood &&
          endYPlayer > endYFood){
        //console.log(food);
        ate = ate + 1;
        this.loadNewFood();

      }else{
        tempFoods.push(food);
      }
    }
    this.setState({
      foods: tempFoods
    });
    return ate;
  }

  componentDidMount() {
    this.createFoods();
    window.addEventListener('mousemove', (event) => {
      this.updateGame(event.clientX, event.clientY);
    });
  }

  loadNewFood(){
    setTimeout(() => {
      let tempFoods = this.state.foods;
      tempFoods.push(this.newFood("green"));

      this.setState({
        foods: tempFoods
      });

    }, 500);

    console.log("oi");
    console.log(this.state.foods);
  }

  createFoods(){
    let tempFoods = [];
    for (let i = 0; i < 100; i++){
      tempFoods.push(this.newFood("red"));
    }
    this.setState({
      foods: tempFoods
    });

  }

  newFood(color){
    let x = Math.floor(Math.random() * 990);
    let y = Math.floor(Math.random() * 590);
    return {cx: x, cy: y, r:"6", fill:color };
  }

  renderFood(food, index){
    return (<Food key={index} cx={food.cx} cy={food.cy} r={food.r} fill={food.fill} />);
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
