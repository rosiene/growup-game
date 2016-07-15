import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
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
      <div>
        <form onSubmit={ this.onSubmit.bind(this) }>
          <TextField floatingLabelText="What is your nickname?" ref="newPlayer"/>
          <br/>
          <TextField floatingLabelText="Color?" ref="color"/>
          <br/>
          <RaisedButton label="Start" primary={true} style={style} type="submit"/>


        </form>
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
