import React from 'react';
import Circle from './circle';

class Player extends React.Component {

  render(){
    return(
      <Circle
        r={this.props.player.r}
        cx={this.props.player.cx}
        cy={this.props.player.cy}
        fill={this.props.player.fill}
        />
    );
  }
}

export default Player;
