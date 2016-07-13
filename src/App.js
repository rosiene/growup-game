import React from 'react';
import Canvas from './containers/canvas';
import Header from './containers/header';

class App extends React.Component {
    render() {
        return (
          <div>
            <Header />
            <Canvas />
          </div>
        );
    }
}

export default App;
