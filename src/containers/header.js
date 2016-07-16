import React from 'react';
import HeaderBar from '../components/headerbar';

class Header extends React.Component {

  render(){
    return (
      <div>
        <HeaderBar
          name={this.props.currentPlayer.name}
          food_eaten={this.props.currentPlayer.food_eaten}
          time_alive={this.props.currentPlayer.time_alive}
          delay={this.props.currentPlayer.delay}
          score={this.props.currentPlayer.food_eaten}
          players={this.props.players}
          />

      </div>
    );
  }
}

export default Header;
