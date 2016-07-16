import React from 'react';
import _ from 'lodash';
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
    this.randomColors();

    this.currentPlayerPositions = [];

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
    // this.modelPlayer.subscribe(this.updatePlayer.bind(this));
  }

  updateFood(){
    this.setState({
      foods: this.modelFood.resources
    });
  }

  getCurrentPlayer(){
    this.setState({
      currentPlayer: this.modelPlayer.resources[this.modelPlayer.resources.length-1]
    });
  }

  updatePlayer(){
    let tempPlayer = this.state.players.map((player) => {
      return this.state.currentPlayer._id === player._id ? this.state.currentPlayer : player;
    });
    this.modelPlayer.save(this.state.currentPlayer, tempPlayer);
  }

  updatePlayers(){
    this.setState({
      players: this.modelPlayer.resources
    });
  }

  setPlayer(name, fill) {

    this.modelPlayer.addResource({
      name: name,
      r: 20,
      cx: Math.floor(Math.random() * 990),
      cy: Math.floor(Math.random() * 640),
      nx: 20,
      ny: 20,
      fill: fill,
      stroke: "#ccc",
      stroke_width: 2,
      food_eaten: 0,
      time_alive: "00:00:00",
      delay: 5,
      ranking: 0,
      status: "alive"
    });

    setTimeout(() => {
      this.updatePlayers();

      setTimeout(() => {
        this.getCurrentPlayer();
      }, 50);

      alert("Go!");

      this.startGame();

      this.setState({
          game: true
      });
    }, 50);

  }

  startGame() {
    this.updateFood();

    if (this.state.foods.length === 0) {
      this.createFoods();
    }

    this.updateTime(0);
    this.playGame();
    console.log(this.state);
  }

  playGame(){
    window.addEventListener('mousemove', (event) => {
      this.currentPlayerPositions.push({
        x: event.clientX,
        y: event.clientY
      });
      this.updatePosition();
    });
    this.updateGame();
  }



  createFoods(){
    for (let i = 0; i < 100; i++){
      this.setFood(this.randomColors());
    }
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
  }

  setFood(color){
    let x = Math.floor(Math.random() * 990);
    let y = Math.floor(Math.random() * 640);
    let food = {cx: x, cy: y, r: 6, fill:color };

    this.modelFood.addResource({
      r: food.r,
      cx: food.cx,
      cy: food.cy,
      fill: food.fill
    });

    this.updateFood();
    return food;
  }

  checkStatus(){
    this.modelPlayer.resources.map((current) => {
      if (this.state.currentPlayer._id === current._id){
        if (current.status === "dead"){
          this.killPlayer(current);
          alert("DEAD!!");
          window.location.reload();
        }
      }
    });
  }

  updateGame(){

    setTimeout(() => {

      let ate = this.eatFood(this.state.currentPlayer.nx, this.state.currentPlayer.ny);
      ate += this.eatPlayer(this.state.currentPlayer.nx, this.state.currentPlayer.ny);
      ate += parseInt(this.state.currentPlayer.food_eaten);

      let delay = parseInt(this.state.currentPlayer.delay);

      this.setState({
        currentPlayer: {
          _id: this.state.currentPlayer._id,
          r: this.playerGrow(ate),
          cx: this.playerDelay(delay, ate)[0],
          cy: this.playerDelay(delay, ate)[1],
          nx: this.state.currentPlayer.nx,
          ny: this.state.currentPlayer.ny,
          fill: this.state.currentPlayer.fill,
          name: this.state.currentPlayer.name,
          stroke: this.state.currentPlayer.stroke,
          stroke_width: this.state.currentPlayer.stroke_width,
          food_eaten: ate,
          time_alive: this.state.currentPlayer.time_alive,
          speed: 0,
          delay: this.playerDelay(delay, ate)[2]
        }
      });
      this.updatePlayer();
      this.updatePlayers();
      this.updateFood();
      this.updateGame();
    }, 100);

    this.checkStatus();
  }

  playerGrow(eatFood){
    let size = parseInt(this.state.currentPlayer.r);
    let newSize = 20 + (eatFood/5);

    if (size > newSize) {
      return size;
    } else {
      return newSize;
    }
  }

  playerDelay(delay, ate){

    delay = 5 + (ate/5);

    let nX = parseInt(this.state.currentPlayer.nx);
    let nY = parseInt(this.state.currentPlayer.ny);
    let cX = parseInt(this.state.currentPlayer.cx);
    let cY = parseInt(this.state.currentPlayer.cy);

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

  eatPlayer(x, y){
    let ate = 0;
    let tempPlayer = []

    for (let i = 0; i < this.state.players.length; i++){

      let player = this.state.players[i];
      let currentPlayer = this.state.currentPlayer;

      let startXPlayer = parseInt(player.cx) - parseInt(player.r);
      let startYPlayer = parseInt(player.cy) - parseInt(player.r);
      let endXPlayer = parseInt(player.cx) + parseInt(player.r);
      let endYPlayer = parseInt(player.cy) + parseInt(player.r);

      let startXCurrentPlayer = parseInt(currentPlayer.cx) - parseInt(currentPlayer.r);
      let startYCurrentPlayer = parseInt(currentPlayer.cy) - parseInt(currentPlayer.r);
      let endXCurrentPlayer = parseInt(currentPlayer.cx) + parseInt(currentPlayer.r);
      let endYCurrentPlayer = parseInt(currentPlayer.cy) + parseInt(currentPlayer.r);

      if (startXCurrentPlayer < startXPlayer &&
           startYCurrentPlayer < startYPlayer &&
          endXCurrentPlayer > endXPlayer &&
          endYCurrentPlayer > endYPlayer){
        if (player.food_eaten < 5) {
          ate = ate + 5;
        }else{
          ate = ate + player.food_eaten;
        }
        this.killPlayer(player);

      }else{
        tempPlayer.push(player);
      }
    }
    this.setState({
      players: tempPlayer
    });
    return ate;
  }

  killPlayer(player){
    player.r = 0;
    player.cx = 0;
    player.cy = 0;
    player.status = "dead";
    this.modelPlayer.save(player, player);
  }

  eatFood(x, y){
    let ate = 0;
    let tempFoods = [];
    for (let i = 0; i < this.state.foods.length; i++){

      let food = this.state.foods[i];
      let player = this.state.currentPlayer;

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
        this.newPositionFood(food);
      }else{
        tempFoods.push(food);
      }
    }
    this.setState({
      foods: tempFoods
    });
    return ate;
  }

  updatePosition(){
    let lastPos = this.currentPlayerPositions.pop();
    this.currentPlayerPositions = [lastPos];
    let tempPlayer = this.state.currentPlayer;
    tempPlayer.nx = lastPos.x - 200;
    tempPlayer.ny = lastPos.y;
    this.setState({
      currentPlayer: tempPlayer
    });
  }


  newPositionFood(food){
    food.fill = this.randomColors();
    food.cx = Math.floor(Math.random() * 990);
    food.cy = Math.floor(Math.random() * 640);
    this.modelFood.save(food, food);
  }

  renderPlayer(player, index){
    return (
      <Player key={index} cx={player.cx} cy={player.cy} r={player.r} fill={player.fill} stroke={player.stroke} stroke_width={player.stroke_width} />
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
            { this.state.foods.map(this.renderFood) }
            { this.state.players.map(this.renderPlayer) }
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
