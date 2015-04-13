"use strict";

var React = require("react");

var ZIndexController = React.createClass({

  mixins: [
    require("./Scale-mixin")
  ],

  getInitialState: function() {
    return {
      zIndex: this.props.zIndex || 0
    };
  },

  render: function() {
    return (
      <div className="zindex-controller">
        <div style={this.getScaleStyle()}>
          layer position: <span className="zmod left" onClick={this.zDown}>◀</span> {this.state.zIndex} <span className="zmod right" onClick={this.zUp}>▶</span>
        </div>
      </div>
    );
  },

  zUp: function(evt) {
    evt.stopPropagation();
    this.setState({ zIndex: this.state.zIndex + 1 }, function() {
      if(this.props.onChange) {
        this.props.onChange(this.state.zIndex);
      }
    });
  },

  zDown: function(evt) {
    evt.stopPropagation();
    this.setState({ zIndex: Math.max(0, this.state.zIndex - 1) }, function() {
      if(this.props.onChange) {
        this.props.onChange(this.state.zIndex);
      }
    });
  }
});

module.exports = ZIndexController;
