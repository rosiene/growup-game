import React from 'react';

class Circle extends React.Component {

  render(){
    return(
      <circle r={this.props.r} cx={this.props.cx} cy={this.props.cy} fill={this.props.fill} stroke={this.props.stroke} strokeWidth={this.props.stroke_width} />
    )
  }
}

export default Circle;
