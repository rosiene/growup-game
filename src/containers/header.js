import React from 'react';
import HeaderBar from '../components/headerbar'

class Header extends React.Component {

  render(){
    return (
      <div>
        <HeaderBar
          name={this.props.player.name}
          food_eaten={this.props.player.food_eaten}
          time_alive={this.props.player.time_alive}
          speed={this.props.player.speed}
           />
      </div>
    );
  }
}

export default Header;
