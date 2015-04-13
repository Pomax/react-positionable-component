var React = require("react");

var Log = React.createClass({

  getInitialState: function() {
    return {
      messages: []
    };
  },

  componentWillMount: function() {
    document.addEventListener("app:log", this.logMessage);
  },

  logMessage: function(evt) {
    var msg = evt.detail.msg;
    this.setState({
      messages: this.state.messages.concat([msg])
    }, function() {
      this.getDOMNode().scrollTo(0,99999999999999999);
    });
  },

  render: function() {
    var messages = this.state.messages.map(function(m) {
      return <div>{m}</div>;
    });
    return <div className="log">{messages}</div>;
  },

  componentWillUnmount: function() {
    document.removeEventListener("app:log", this.logMessage);
  },

});

module.exports = Log;
