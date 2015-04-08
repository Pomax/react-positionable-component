"use strict";

var React = require("react/dist/react.min");

var PlacementController = React.createClass({
  mixins: [
    require("./Transform-mixin")
  ],

  render: function() {
    return <div className="placement-control">
      <span>↔</span>
      <span>↕</span>
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