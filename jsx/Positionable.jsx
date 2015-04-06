var React = require("react");
var RotationController = require("./RotationController.jsx");
var ScaleController = require("./ScaleController.jsx");
var classes = require("classnames");

var Positionable = React.createClass({
  mixins: [
    require("./Transform-mixin")
  ],

  getInitialState: function() {
    return {
      angle: 0,
      scale: 1
    };
  },

  render: function() {
    var x = this.state.x + this.state.xDiff;
    var y = this.state.y + this.state.yDiff;

    var style = {
      transform: [
        "translate("+x+"px, "+y+"px)",
        "rotate("+this.state.angle+"deg)",
        "scale("+this.state.scale+")"
      ].join(" "),
      transformOrigin: "center"
    };

    var className = classes({
      positionable: true,
      activated: this.state.activated
    });

    return (
      <div style={style}
           className={className}
           /*onClick={this.toggle}*/
           onMouseDown={this.state.activated ? this.startReposition : false}
           onTouchStart={this.state.activated ? this.startReposition : false} >
        <RotationController origin={this} onRotate={this.handleRotation}/>
        <ScaleController    origin={this} onScale={this.handleScaling}/>
        {this.props.children}
      </div>
    );
  },

  handleRotation: function(angle) { this.setState({ angle: (180 * angle / Math.PI) }); },
  handleScaling: function(scale) { this.setState({ scale: scale }); }

});

module.exports = Positionable;
