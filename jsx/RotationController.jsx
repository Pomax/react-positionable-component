"use strict";

var React = require("react/dist/react.min");

var RotationController = React.createClass({
  mixins: [
    require("./Transform-mixin")
  ],

  getInitialState: function() {
    return { base: this.props.angle || 0, angle: 0 };
  },

  render: function() {
    return <div className="rotation-control">↻</div>;
  },

  handleTransform: function() {
    var s = this.state, p = this.props;

    if (p.origin && p.onChange) {
      var node = p.origin.getDOMNode();
      var dims = node.getBoundingClientRect();
      var xOffset = dims.left + (dims.right - dims.left)/2;
      var yOffset = dims.top + (dims.bottom - dims.top)/2;

      // normalised vector 1:
      var x1 = s.xMark - xOffset,
          y1 = s.yMark - yOffset,
          m1 = Math.sqrt(x1*x1 + y1*y1);
      x1 /= m1;
      y1 /= m1;

      // normalised vector 2:
      var x2 = (s.xMark + s.xDiff) - xOffset,
          y2 = (s.yMark + s.yDiff) - yOffset,
          m2 = Math.sqrt(x2*x2 + y2*y2);
      x2 /= m2;
      y2 /= m2;

      // signed angle between these vectors:
      var cross = x1*y2 - y1*x2;
      var dot   = x1*x2 + y1*y2;
      var angle = Math.atan2(cross, dot);

      // communicate angle to owner
      this.setState(
        { angle: angle },
        function() { p.onChange(this.state.base + angle); }
      );
    }
  },

  handleTransformEnd: function() {
    this.setState({
      base: this.state.base + this.state.angle
    });
  }
});

module.exports = RotationController;
