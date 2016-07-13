import React from 'react';
import Header from './containers/header';
import Svg from './containers/svg';

class App extends React.Component {
    render() {
        return (
          <div>
            <Header />
            <Svg />
          </div>
        );
    }
}

export default App;
