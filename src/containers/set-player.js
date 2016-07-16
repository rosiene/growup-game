
import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  marginTop: 50,
  margin: 12,
  display: 'flex',
  justifyContent: 'center'
};

const cardStyle = {
  width: 500,
};
const cardTitleStyle = {
  fontWeight: "bold",
  display: 'flex',
  justifyContent: 'center'
};
const cardTextStyle = {
  padding: 20,
  textAlign: "center",
  display: 'flex',
  justifyContent: 'center'
};

const cardFormStyle = {
  padding: 20,
  display: 'flex',
  justifyContent: 'center'
};

const styleButton = {
  marginTop: 50,
  margin: 12,
  justifyContent: 'center',
  width: 225
};
 const madeText = {
   padding: 10,
   fontSize: 10,
   display: 'flex',
   justifyContent: 'center'
 };

class SetPlayer extends React.Component {

  onSubmit(event) {
    event.preventDefault();

    let name = this.refs.newPlayer.value;
    let colorL = this.refs.colorList;
    let fill = colorL.options[colorL.selectedIndex].text;

    console.log("Registering as: ", name);

    this.props.onChange(name, fill);
  }

  renderUserForm() {
    return (
      <div style={style}>
        <Card style={cardStyle}>
        <CardMedia>
          <img src="https://s31.postimg.org/6b090z1iz/growup.png"/>
        </CardMedia>
        <div style={cardTitleStyle}>
          <CardTitle title="Grow Up!" />
        </div>
        <div style={cardTextStyle}>

           Play the game and control your cell and eat the confetti to grow bigger! Maybe even eat other players.

        </div>
        <div style={cardFormStyle}>
          <form onSubmit={ this.onSubmit.bind(this) }>
            <input ref="newPlayer" type="text" placeholder="What's your name?" />
            <br/>
            <br/>
            <select ref="colorList">
              <option ref="color" value="#3366ff">Blue</option>
              <option ref="color" value="#ff0000">Red</option>
              <option ref="color" value="#2eb82e">Green</option>
              <option ref="color" value="#b800e6">Purple</option>
              <option ref="color" value="#ffcc00">Yellow</option>
            </select>
            <br/><br/>
            <input type="submit" value="Start" />
          </form>
          </div>
          <div style={madeText}>
          Made by: Rosiene, Deisi, Aeshta and Mariano
          </div>
        </Card>
      </div>
    );
  }

  resetUser(event) {
    event.preventDefault();
    this.props.onChange("guest");
  }

  renderGreeting() {
    return (
      <div>
        <p></p>
      </div>
    );
  }

  render() {
    return this.renderUserForm();
    if (this.props.username == "") {
    } else {
      return this.renderGreeting();
    }
  }
}

export default SetPlayer;
