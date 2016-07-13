import React from 'react';
import Circle from './circle';

let c, ctx;

class Player extends React.Component {


  constructor(){
    super();

    this.state = {
      r: "20",
      cx: 20,
      cy: 20,
      fill: "blue"
    }
  }

  updatePosition(x, y){
    this.setState({
      cx: x,
      cy: y - 100
    })
  }

  componentDidMount() {
    window.addEventListener('mousemove', (event) => {
      this.updatePosition(event.clientX, event.clientY);
    });
  }

  render(){
    return(
      <Circle r={this.state.r} cx={this.state.cx} cy={this.state.cy} fill={this.state.fill} />
    );
  }
}

export default Player;
