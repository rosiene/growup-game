import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Svg from './containers/svg';

class App extends React.Component {

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Svg />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
