import React from 'react';


class Raking extends React.Component{

  render() {
    return (
      <div>
        <HeaderBar
          <div>
            Ranking:{this.props.player.map(function(player, index){ return player.name; })}
            Player={this.props.currentPlayer.name}
            Score={this.props.players.food_eaten}
          </div>
         />
      </div>
    );
  }
}

export default Ranking;
