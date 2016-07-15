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
  backgroundColor: "lightBlue",
  fontSize: 30,
  fontWeight: "bold",
  paddingLeft: 80,
};

const cardTextStyle = {
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
          <CardHeader style={cardTitleStyle}>
            Grow Up!
          </CardHeader>
          <div style={cardTextStyle}>
          <form onSubmit={ this.onSubmit.bind(this) }>
            <TextField floatingLabelText="What is your nickname?" ref="newPlayer"/>
            <br/>
            <TextField floatingLabelText="Color?" ref="color"/>
            <br/>
            <RaisedButton label="Start"   backgroundColor="lightBlue" style={styleButton} type="submit"/>
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
