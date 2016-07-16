import React from 'react';

class Ranking extends React.Component{

  render() {
    return (
        <li>
          {this.props.name} [{this.props.score}]
        </li>
    );
  }
}

export default Ranking;
