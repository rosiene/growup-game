import React from 'react';
import Utils from '../lib/Utils';
import Player from './player';
import Header from './header';
import Food from './food';
import SetPlayer from './set-player';
import FoodModel from '../models/FoodModel';
import PlayerModel from '../models/PlayerModel';
import Colors from '../styles/colors';

class Svg extends React.Component {

  constructor(){
    super();

    this.utils = new Utils();

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
      players: [],
      game: false,
      currentPlayer: {}
    };

    this.modelFood = new FoodModel();
    this.modelFood.subscribe(this.updateFood.bind(this));

    this.modelPlayer = new PlayerModel();
    this.modelPlayer.subscribe(this.updatePlayer.bind(this));
  }

  updateFood(){
    this.setState({
      foods: this.modelFood.resources
    });
  }

  updatePlayer(){
    this.setState({
      players: this.modelPlayer.resources
    });
  }

  setPlayer(name, fill) {

    let player = this.newPlayer(name, fill);

    this.modelPlayer.addResource({
      name: player.name,
      r: player.r,
      cx: player.cx,
      cy: player.cy,
      nx: player.nx,
      ny: player.ny,
      fill: player.fill,
      stroke: player.stroke,
      stroke_width: player.stroke_width,
      food_eaten: player.food_eaten,
      time_alive: player.time_alive,
      delay: player.delay,
      ranking: player.ranking
    });
    this.updatePlayer();

    let currentPlayer = this.modelPlayer.resources.data[this.modelPlayer.resources.data.length - 1];
    console.log(currentPlayer);
    this.setState({
      currentPlayer: currentPlayer
    })

    this.setState({
        game: true
    });

    this.startGame();
  }

  newPlayer(name, fill){

    return {
        name: name,
        r: 20,
        cx: 20,
        cy: 20,
        nx: 20,
        ny: 20,
        fill: fill,
        food_eaten: 0,
        time_alive: "00:00:00",
        delay: 5,
        ranking: 0,
        stroke: "#ccc",
        stroke_width: 2
    }
  }



  startGame() {
    this.createFoods();
    this.updateTime(0);
    this.playGame();
  }

  playGame(){

    let lost = false;

    //while(!lost){
      //this.updateGame();
      //window.addEventListener('mousemove', (event) => {
      //  this.updatePosition(event.clientX, event.clientY);
      //});
    //}
  }

  createFoods(){
    for (let i = 0; i < 100; i++){
      this.setFood("red");
    }
  }

  setFood(color){
    let x = Math.floor(Math.random() * 990);
    let y = Math.floor(Math.random() * 640);
    let food = {cx: x, cy: y, r:6, fill:color };

    this.modelFood.addResource({
      r: food.r,
      cx: food.cx,
      cy: food.cy,
      fill: food.fill
    });

    this.updateFood();
    return food;
  }

  updateGame(){

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
       time += 1;
       let tempCurrentPlayer = this.state.currentPlayer;
       console.log(tempCurrentPlayer);
       tempCurrentPlayer.time_alive = this.setFormatTime(time);
       this.setState({
         currentPlayer: tempCurrentPlayer
       });
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


  loadNewFood(){
    setTimeout(() => {
      let tempFoods = this.state.foods;
      tempFoods.push(this.newFood("green"));

      this.setState({
        foods: tempFoods
      });

    }, 500);
  }

  renderPlayer(player, index){
    return (
      <Player key={index} cx={player.cx} cy={player.cy} r={player.r} fill={player.fill} />
    );
  }

  renderFood(food, index){
    return (
      <Food key={index} cx={food.cx} cy={food.cy} r={food.r} fill={food.fill} />
    );
  }

  renderSvg(){
    return (
      <div>
        <Header player={this.state.currentPlayer} />
        <div style={this.style}>
          <svg id="board"  style={this.svgstyle} width="1000" height="650">
            { this.state.foods.data.map(this.renderFood) }
            { this.state.players.data.map(this.renderPlayer) }
          </svg>
        </div>
      </div>
    );
  }

  renderSetPlayer(){
    return (
      <SetPlayer onChange={ this.setPlayer.bind(this) } />
    );
  }


  render(){
    if (!this.state.game){
      return this.renderSetPlayer();
    }else{
      return this.renderSvg();
    }
  }
}

export default Svg;
