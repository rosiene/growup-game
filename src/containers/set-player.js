import React from 'react';

class SetPlayer extends React.Component {

  onSubmit(event) {
    event.preventDefault();

    let name = this.refs.newPlayer.value;
    let color = this.refs.color.value;
    console.log("Registering as: ", name);

    this.props.onChange(name, color);
  }

  renderUserForm() {
    return (
      <form onSubmit={ this.onSubmit.bind(this) }>
        <input ref="newPlayer" type="text" placeholder="What's your name?" />
        <input ref="color" type="text" placeholder="Color?" />
        <input type="submit" value="Register" />
      </form>
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
    if (this.props.username == "") {
      return this.renderUserForm();
    } else {
      return this.renderGreeting();
    }
  }
}

export default SetPlayer;
