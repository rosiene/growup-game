import React from 'react';
import Header from './containers/header';
import Svg from './containers/svg';

class App extends React.Component {
  constructor(){
    super();

    this.state = {
      food_eaten: 0,
      time_alive: 0,
      speed: 0
    }
  }
    render() {
        return (
          <div>
            <Header />
            <Svg
            food_eaten={this.state.food_eaten}
            time_alive={this.state.time_alive}
            speed={this.state.speed} />
          </div>
        );
    }
}

export default App;
