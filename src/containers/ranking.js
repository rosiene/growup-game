import React from 'react';

class Ranking extends React.Component{

  render() {
    return (
        <li>
          {this.props.name} [{this.props.food_eaten}]
        </li>
    );
  }
}

export default Ranking;
