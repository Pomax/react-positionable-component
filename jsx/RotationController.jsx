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
    return (
      <div className="rotation-control"
           onMouseDown={this.state.activated ? this.startReposition : false}
           onTouchStart={this.state.activated ? this.startReposition : false}>↻</div>
    );
  },

  handleTransform: function() {
    var s = this.state;

    if (this.props.origin && this.props.onRotate) {
      var dimensions = this.props.origin.getDOMNode().getBoundingClientRect();
      var xOffset = dimensions.left + (dimensions.right - dimensions.left)/2;
      var yOffset = dimensions.top + (dimensions.bottom - dimensions.top)/2;
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
        function() { this.props.onRotate(this.state.base + angle); }
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
