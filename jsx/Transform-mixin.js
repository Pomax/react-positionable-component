"use strict";

function fixTouchEvent(evt) {
  /*
    var winPageX = window.pageXOffset,
        winPageY = window.pageYOffset,
        x = evt.clientX,
        y = evt.clientY;
    if (evt.pageY === 0 && Math.floor(y) > Math.floor(evt.pageY) ||
        evt.pageX === 0 && Math.floor(x) > Math.floor(evt.pageX)) {
        // iOS4 clientX/clientY have the value that should have been
        // in pageX/pageY. While pageX/page/ have the value 0
        x = x - winPageX;
        y = y - winPageY;
    } else if (y < (evt.pageY - winPageY) || x < (evt.pageX - winPageX) ) {
        // Some Android browsers have totally bogus values for clientX/Y
        // when scrolling/zooming a page. Detectable since clientX/clientY
        // should never be smaller than pageX/pageY minus page scroll
        x = evt.pageX - winPageX;
        y = evt.pageY - winPageY;
    }
  */
  evt.clientX = evt.clientX || evt.touches[0].clientX || evt.touches[0].pageX;
  evt.clientY = evt.clientY || evt.touches[0].clientY || evt.touches[0].pageY;
}


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

    this.setState({
      activated: true,
      active: true
    }, function() {
      fixTouchEvent(evt);
      this.startReposition(evt)
      this.listenForRepositioningTouch();
    });
  },

  listenForRepositioningTouch: function() {
    document.addEventListener("touchmove", this.reposition);
    document.addEventListener("touchend",  this.endReposition);
  },

  reposition: function(evt) {
    if(this.state.active) {
      if(evt.type.indexOf("touch") !== -1) {
        fixTouchEvent(evt);
      }
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
      if(evt.type.indexOf("touch") !== -1) {
        fixTouchEvent(evt);
      }
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

    if (evt.type.indexOf("touch") !== -1) {
      evt.stopPropagation();
      evt.preventDefault();
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
