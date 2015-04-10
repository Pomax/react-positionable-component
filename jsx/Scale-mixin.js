module.exports = {
  getInitialState: function() {
  	return {
  	  stylingScale: 1
  	};
  },

  getScaleStyle: function() {
    return {
      transform: "scale(" + (this.state.stylingScale || 1) + ")",
      transformOrigin: "center center"
    }
  },

  setScale: function(stylingScale) {
    this.setState({
      stylingScale: stylingScale
    });
  },
};
