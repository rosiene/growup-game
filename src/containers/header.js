import React from 'react';
import HeaderBar from '../components/headerbar';

class Header extends React.Component {

  render(){
    return (
      <div>
        <HeaderBar
          name={this.props.player.name}
          food_eaten={this.props.player.food_eaten}
          time_alive={this.props.player.time_alive}
          delay={this.props.player.delay}
          ranking={this.props.name}
          />
      </div>
    );
  }
}

export default Header;
