import React from 'react';
import _ from 'lodash';

class HeaderBar extends React.Component{

  constructor(props){
    super(props);

    this.baseStyle = _.merge({
      backgroundColor: "#9CCC65",
      color: "#FAFAFA",
      textAlign:'center',
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      margin: 0,
      padding: "5px 10px",
      boxShadow: "1px 1px 5px rgba(0,0,0,0.3)",
    }, props.style || {});


    this.headerStyle = _.merge({
      color: "#fff",
    }, this.props.headerStyle || {});
  }

  render(){
    return (
      <div style={this.baseStyle}>
        <h1>Grow Up!</h1>
      </div>
    );
  }
}


export default HeaderBar;
