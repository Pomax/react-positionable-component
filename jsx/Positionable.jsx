var React = require("react");
var ZIndexController = require("./ZIndexController.jsx");
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
      scale: 1,
      zIndex: 1
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
      transformOrigin: "center",
      zIndex: this.state.zIndex
    };

    var className = classes({
      positionable: true,
      activated: this.state.activated
    });

    return (
      <div style={style}
       className={className}
       onMouseDown={this.state.activated ? this.startReposition : false}
       onTouchStart={this.state.activated ? this.startReposition : false}>

        <ZIndexController   zIndex={1} onChange={this.handleZIndexChange}                 />
        <RotationController activated="true" origin={this} onRotate={this.handleRotation} />
        <ScaleController    activated="true" origin={this} onScale={this.handleScaling}   />
        {this.props.children}

      </div>
    );
  },

  handleZIndexChange: function(z) { this.setState({ zIndex: z })},
  handleRotation: function(angle) { this.setState({ angle: (180 * angle / Math.PI) }); },
  handleScaling: function(scale) { this.setState({ scale: scale }); }

});

module.exports = Positionable;
