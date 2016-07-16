
import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const style = {
  marginTop: 50,
  margin: 12,
  display: 'flex',
  justifyContent: 'center'

};

const cardStyle = {
  width: 500,
};

const cardTextStyle = {
  fontWeight: "bold",
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


class SetPlayer extends React.Component {

  onSubmit(event) {
    event.preventDefault();

    let name = this.refs.newPlayer.value;
    let fill = this.refs.color.value;

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
        <div style={cardTextStyle}>
          <CardTitle title="Grow Up!" />
        </div>
        <div style={cardTextStyle}>
          <CardText>
             Control your cell and eat other players to grow larger!
          </CardText>
        </div>
        <div style={cardFormStyle}>
          <form onSubmit={ this.onSubmit.bind(this) }>
            <input ref="newPlayer" type="text" placeholder="What's your name?" />
            <br/><br/>
            <input ref="color" type="text" placeholder="Color?" />
            <br/><br/>
            <input type="submit" value="Start" />
          </form>
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
