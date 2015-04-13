"use strict";

var React = require("react");

var PlacementController = React.createClass({
  mixins: [
    require("./Transform-mixin"),
    require("./Scale-mixin")
  ],

  render: function() {
    return <div className="placement-control">
      <div style={this.getScaleStyle()}>
        <span>↔</span>
        <span>↕</span>
      </div>
    </div>;
  },

  handleTransform: function() {
    if (this.props.onChange) {
      var x = this.state.x + this.state.xDiff;
      var y = this.state.y + this.state.yDiff;
      this.props.onChange(x, y);
    }
  }
});

module.exports = PlacementController;
65254