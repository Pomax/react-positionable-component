"use strict";

var React = require("react");
var classes = require("classnames");

var PlacementController = require("./PlacementController.jsx");
var RotationController = require("./RotationController.jsx");
var ScaleController = require("./ScaleController.jsx");
var ZIndexController = require("./ZIndexController.jsx");

var onClickOutside = require("react-onclickoutside");

var Positionable = React.createClass({

  mixins: [ onClickOutside ],

  handleClickOutside: function() {
    this.stopHandling();
    this.setState({
      activated: false
    });
  },

  getInitialState: function() {
    return {
      x: this.props.x || 0,
      y: this.props.y || 0,
      angle: this.props.angle || 0,
      scale: this.props.scale || 1,
      zIndex: this.props.zIndex || 1,
      activated: !!this.props.activated || false
    };
  },

  render: function() {
    var x = this.state.x,
        y = this.state.y,
        angle = (180 * this.state.angle / Math.PI),
        scale = this.state.scale,
        zIndex = this.state.zIndex;

    var style = {
      transform: [
        "translate("+x+"px, "+y+"px)",
        "rotate("+angle+"deg)",
        "scale("+scale+")"
      ].join(" "),
      transformOrigin: "center",
      zIndex: zIndex
    };

    var className = classes({
      positionable: true,
      activated: this.state.activated
    });

    var controls = [
      <PlacementController x={this.state.x}
                           y={this.state.y}
                           ref="placementController"
                           onChange={this.handleTranslation}
                           activated="true"
                           origin={this} />
      ,
      <RotationController  angle={this.state.angle}
                           ref="rotationController"
                           onChange={this.handleRotation}
                           activated="true"
                           origin={this} />
      ,
      <ScaleController     scale={this.state.scale}
                           ref="scaleController"
                           onChange={this.handleScaling}
                           activated="true"
                           origin={this} />
      ,
      <ZIndexController    zIndex={this.state.zIndex}
                           ref="zIndexController"
                           onChange={this.handleZIndexChange} />
    ];

    return (
      <div style={style} className={className}
           onMouseDown={this.startHandling}
           onTap={this.startHandlingTouch}
           onMouseUp={this.stopHandling}>
        { this.state.activated ? controls : false }
        { this.props.children }
      </div>
    );
  },

  toggle: function(evt) {
    this.setState({
      activated: !this.state.activated
    });
  },

  startHandlingTouch: function() {
    this.setState({
      activated: true
    });
  },

  startHandling: function() {
    this.handling = true;
  },

  stopHandling: function() {
    if(this.handling && this.props.clickHandler && !this.manipulating) {
      this.props.clickHandler(this);
    }
    this.manipulating = false;
    this.handling = false;
  },

  handleTranslation: function(x, y) {
    this.manipulating = true;
    this.setState({
      x: x,
      y: y
    });
  },

  handleRotation: function(angle) {
    this.manipulating = true;
    this.setState({
      angle: angle
    });
  },

  handleScaling: function(scale) {
    this.manipulating = true;
    this.setState({
      scale: scale
    }, function() {
      // make sure all the controls are counter-scale if scale < 1
      var counterScale = 1/scale;
      ["rotation","scale","placement","zIndex"].forEach(function(c) {
        this.refs[c+"Controller"].setScale(counterScale);
      }.bind(this));
    });
  },

  handleZIndexChange: function(zIndex) {
    this.manipulating = true;
    this.setState({
      zIndex: zIndex
    });
  },

  getTransform: function() {
    return {
      x: this.state.x,
      y: this.state.y,
      angle: this.state.angle,
      scale: this.state.scale,
      zIndex: this.state.zIndex
    };
  },

  setTransform: function(obj) {
    this.setState({
      x: obj.x || 0,
      y: obj.y || 0,
      angle: obj.angle || 0,
      scale: obj.scale || 1,
      zIndex: obj.zIndex || 0
    });
  }
});

module.exports = Positionable;
