import React from 'react';
import _ from 'lodash'
import Utils from '../lib/Utils';
import Player from './player';
import Header from './header';
import Food from './food';
import SetPlayer from './set-player';
import Colors from '../styles/colors';
import Circle from './circle';
import PlayerTwo from './playerTwo';

class Svg extends React.Component {

  constructor(){
    super();

    this.utils = new Utils();
    this.randomColors();
    let name = this.utils.store("game.player");

    this.style = {
      paddingTop: 40,
    };

    this.svgstyle = {
      position: 'fixed',
      border: '2px solid black',
      top: 10,
      marginLeft: "200px",
      backgroundColor: "#252933",
      boxShadow: "1px 1px 5px rgba(0,0,0,0.3)",
    };

    this.state = {
      foods: [],
      player: {
        r: "20",
        cx: 20,
        cy: 20,
        nx: 20,
        ny: 20,
        fill: "white",
        name: "",
        food_eaten: 0,
        time_alive: "00:00:00",
        delay: 5,
        ranking: 0
      }
    };
  }

  updateGame(){
    setTimeout(() => {

      let ate = this.eatFood(this.state.player.nx, this.state.player.ny);
      ate = ate + parseInt(this.state.player.food_eaten);

      let delay = parseInt(this.state.player.delay);

      this.setState({
        player: {
          r: this.playerGrow(ate),
          cx: this.playerDelay(delay, ate)[0],
          cy: this.playerDelay(delay, ate)[1],
          nx: this.state.player.nx,
          ny: this.state.player.ny,
          fill: this.state.player.fill,
          name: this.state.player.name,
          food_eaten: ate,
          time_alive: this.state.player.time_alive,
          speed: 0,
          delay: this.playerDelay(delay, ate)[2]
        }
      });
      this.updateGame();
    }, 10);
  }

  playerDelay(delay, ate){

    delay = 5 + (ate/5);

    let nX = parseInt(this.state.player.nx);
    let nY = parseInt(this.state.player.ny);
    let cX = parseInt(this.state.player.cx);
    let cY = parseInt(this.state.player.cy);

    let arr = [];
    arr.push(cX + ((nX-cX)/delay));
    arr.push(cY + ((nY-cY)/delay));
    arr.push(delay);

    return arr;
  }

  updateTime(time){
    setTimeout(() => {
      time = time + 1;

      let tempPlayer = this.state.player;
      tempPlayer.time_alive = this.setFormatTime(time);

      this.setState({
        player: tempPlayer
      })

      this.updateTime(time);
    }, 1000);
  }

  setFormatTime(time){
    var hours   = Math.floor(time / 3600);
    var minutes = Math.floor((time - (hours * 3600)) / 60);
    var seconds = time - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}

    return hours+':'+minutes+':'+seconds;
  }

  playerGrow(eatFood){
    let size = parseInt(this.state.player.r);
    let newSize = 20 + (eatFood/5);

    if (size > newSize) {
      return size;
    } else {
      return newSize;
    }
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

  updatePosition(x,y){
    let tempPlayer = this.state.player;
    tempPlayer.nx = x;
    tempPlayer.ny = y;
    this.setState({
      player: tempPlayer
    });
  }

  startGame() {
    this.updateTime(0);
    this.updateGame();
    this.createFoods();
    window.addEventListener('mousemove', (event) => {
      this.updatePosition(event.clientX, event.clientY);
    });
  }

  loadNewFood(){
    setTimeout(() => {
      let tempFoods = this.state.foods;
      tempFoods.push(this.newFood(this.randomColors()));

      this.setState({
        foods: tempFoods
      });

    }, 500);
  }

  createFoods(){
    let tempFoods = [];
    for (let i = 0; i < 100; i++){
      tempFoods.push(this.newFood(this.randomColors()));
    }
    this.setState({
      foods: tempFoods
    });

  }

  randomColors(){

   var tempColor = [
     "#ff1a1a",
     "#3366ff",
     "#33cc33",
     "#ffff00",
     "#ff0066",
     "#ff471a",
     "#cc0099"
   ];

   let sampleColor = _.sample(tempColor);
   return sampleColor;
   console.log(sampleColor);

 }

  newFood(color){
    let x = Math.floor(Math.random() * 1090);
    let y = Math.floor(Math.random() * 560);
    return {cx: x, cy: y, r:"8", fill:color };
  }


  setPlayer(name, color) {
    this.utils.store("game.player", name);
    this.utils.store("game.color", color);

    let tempPlayer = this.state.player;
    tempPlayer.name = name;
    tempPlayer.fill = color;
    this.setState({
      player: tempPlayer
    });

    this.startGame();
  }

  renderFood(food, index){
    return (<Food key={index} cx={food.cx} cy={food.cy} r={food.r} fill={food.fill} />);
  }

  render(){
    return(
      <div>
        <Header player={this.state.player} />
          <div style={this.style}>
            <SetPlayer
                username={ this.state.player.name }
                onChange={ this.setPlayer.bind(this) } />
            <svg id="board"  style={this.svgstyle} width="1100" height="600" >
              { this.state.foods.map(this.renderFood) }

              <Player player={this.state.player} />
              <PlayerTwo />
            </svg>
          </div>
      </div>
    );
  }
}

export default Svg;
