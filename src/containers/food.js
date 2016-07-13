import React from 'react';
import Circle from './circle';

class Food extends React.Component {
  constructor(){
    super();

    this.state = {
      r: "6",
      fill: "red"
    }
  }

  render(){
    return(
      <Circle r={this.state.r} cx={this.props.cx} cy={this.props.cy} fill={this.state.fill} />
    );
  }
}

export default Food;
