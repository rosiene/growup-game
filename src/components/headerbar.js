import React from 'react';
import Ranking from '../containers/ranking';
import _ from 'lodash';

class HeaderBar extends React.Component{

  constructor(){
    super();

    this.baseStyle = ({
      backgroundColor: "#583F7E",
      color: "#FAFAFA",
      position: "center",
      width: "180px",
      height: "600px",
      top: 0,
      left: 0,
      right: 0,
      margin: 0,
      padding: "5px 5px",
      boxShadow: "1px 1px 5px rgba(0,0,0,0.3)",
    });

    this.first = ({
      float: "left",
      paddingTop: "10px",
      paddingBottom: "20px",
      width: 300,
      fontSize: 30,
      fontWeight: "bold",
      lineHeight: "50px"
    });

    this.second = ({
      padding: "10px",
      fontWeight: "bold"
    });

  }

  getPlayers(){
    return _.sortBy(this.props.players, 'food_eaten').reverse();
  }

  renderRanking(player, index){
    return (<Ranking key={index} name={player.name} score={player.food_eaten} />);
  }

  render() {
    return (
      <div style={this.baseStyle}>
        <div style={this.first}>
          Grow Up!
        </div>
        <div style={this.second}>
          Player: {this.props.name}
        </div>
        <div style={this.second}>
          Food Eaten: {this.props.food_eaten}
        </div>
        <div style={this.second}>
          Time Alive: {this.props.time_alive}
        </div>
        <div style={this.second}>
          Delay: {this.props.delay}
        </div>
        <div style={this.second}>
          Ranking:
          <ol>
            {this.getPlayers().map(this.renderRanking)}<br />
          </ol>
        </div>
      </div>
    );
  }

}

export default HeaderBar;
