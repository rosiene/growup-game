import React from 'react';
import Circle from './circle';

class Player extends React.Component {

  render(){
    return(
      <Circle
        r={this.props.r}
        cx={this.props.cx}
        cy={this.props.cy}
        fill={this.props.fill}
        stroke={this.props.stroke}
        stroke_width={this.props.stroke_width}
        />
    );
  }
}

export default Player;
