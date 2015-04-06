var React = require("react");
var Positionable = require('./Positionable.jsx');
var TextField = require('./TextField.jsx');

// we want touch enabled.
React.initializeTouchEvents(true);

var content = (<div>
  <Positionable>
    <TextField/>
  </Positionable>

  <Positionable>
    <p>You can <em>do</em> this with a bit of React and CSS3 transforms? What...</p>
  </Positionable>

  <Positionable>
    <img src="http://www.myfacewhen.net/uploads/3578-all-the-things.jpg" alt="all the things"/>
  </Positionable>
</div>);

var target = document.getElementById('app');

React.render(content, target);
