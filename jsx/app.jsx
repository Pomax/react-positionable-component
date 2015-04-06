var React = require("react");

// we want touch enabled.
React.initializeTouchEvents(true);

// Main components:
var Positionable = require('./Positionable.jsx');
var TextField = require('./TextField.jsx');

// Main page content for testing:
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

// and finally, load all that stuff.
var target = document.getElementById('app');
React.render(content, target);
