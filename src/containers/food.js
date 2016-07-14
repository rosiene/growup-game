import React from 'react';
import Circle from './circle';

class Food extends React.Component {

  render(){
    return(
      <Circle r={this.props.r} cx={this.props.cx} cy={this.props.cy} fill={this.props.fill} />
    );
  }
}

export default Food;
