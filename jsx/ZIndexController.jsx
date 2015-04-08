"use strict";

var React = require("react/dist/react.min");

var ZIndexController = React.createClass({

  getInitialState: function() {
    return {
      zIndex: this.props.zIndex || 0
    };
  },

  render: function() {
    var style = {
      zIndex: this.props.zIndex + 1
    };
    return (
      <div className="zindex-controller">
        layer position:
        <button className="zmod left" onClick={this.zDown} style={style}>◀</button>
        {this.state.zIndex}
        <button className="zmod right" onClick={this.zUp} style={style}>▶</button>
      </div>
    );
  },

  zUp: function(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.setState({ zIndex: this.state.zIndex + 1 }, function() {
      if(this.props.onChange) {
        this.props.onChange(this.state.zIndex);
      }
    });
  },

  zDown: function(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.setState({ zIndex: Math.max(0, this.state.zIndex - 1) }, function() {
      if(this.props.onChange) {
        this.props.onChange(this.state.zIndex);
      }
    });
  }
});

module.exports = ZIndexController;
