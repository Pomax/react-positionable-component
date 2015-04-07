"use strict";

module.exports = {

  mixins: [
    require("react-onclickoutside")
  ],

  getInitialState: function() {
    var stayactive = false;
    if (typeof this.props.stayactive !== "undefined") {
      stayactive = !!this.props.stayactive;
    }

    return {
      activated: false,
      active: false,
      stayactive: stayactive,
      x: this.props.x || 0,
      y: this.props.y || 0,
      xMark: 0,
      yMark: 0,
      xDiff: 0,
      yDiff: 0
    };
  },

  componentWillMount: function() {
    var activated = false;
    if (typeof this.props.activated !== "undefined") {
      activated = !!this.props.activated;
    }
    if(activated) this.setState({ activated: activated});
  },

  componentWillUnmount: function() {
    this.stopListening();
  },

  toggle: function(evt) {
    this.setState({
      activated: !this.state.activated
    });
  },

  startReposition: function(evt) {
    if (this.state.activated) {
      this.setState({
        active: true,
        xMark: evt.clientX,
        yMark: evt.clientY,
        xDiff: 0,
        yDiff: 0
      });
      this.listenForRepositioning();
    }
  },

  listenForRepositioning: function() {
    document.addEventListener("mousemove", this.reposition);
    document.addEventListener("mouseup",   this.endReposition);
  },

  startRepositionTouch: function(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    this.startReposition(evt)

    this.listenForRepositioningTouch();
  },

  listenForRepositioningTouch: function() {
    var reposition = this.reposition.bind(this);
    document.addEventListener("touchmove", function(evt) {
      alert("move:" + evt.clientX + "," + evt.clientY);
      reposition(evt);
    });
    document.addEventListener("touchend",  this.endReposition);
  },

  reposition: function(evt) {
    if(this.state.active) {
      this.setState({
        xDiff: evt.clientX - this.state.xMark,
        yDiff: evt.clientY - this.state.yMark
      }, function() {
        if (this.handleTransform) {
          this.handleTransform();
        }
      });
    }

    if (evt.type.indexOf("touch") !== -1) {
      evt.stopPropagation();
      evt.preventDefault();
    }
  },

  endReposition: function(evt) {
    if(this.state.active) {
      this.setState({
        active: false,
        x: this.state.x + this.state.xDiff,
        y: this.state.y + this.state.yDiff,
        xDiff: 0,
        yDiff: 0
      });
      this.stopListening();
      if (this.handleTransformEnd) {
        this.handleTransformEnd();
      }
    }
  },

  stopListening: function() {
    document.addEventListener("touchmove", this.reposition);
    document.addEventListener("mousemove", this.reposition);

    document.addEventListener("touchend",  this.endReposition);
    document.addEventListener("mouseup",   this.endReposition);
  },

  handleClickOutside: function(evt) {
    if(this.state.repositioning) {
      this.endReposition();
    }
  }
};
