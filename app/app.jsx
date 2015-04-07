"use strict";

var React = require("react/dist/react.min");

// Main components:
var Positionable = require('../jsx/Positionable.jsx');
var TextField = require('./TextField.jsx');
var Log = require('./Log.jsx');

// Main page content for testing:
var content = (
  <article>

    <Log />

    <h1>Draggable, resizable, rotate... rota... rotateable? Whatever: manipulable elements</h1>

    <p>Grab any element that lights up green when you mouseover, and try manipulating it.</p>

    <div><Positionable activated="true" stayactive="true">
      <TextField/>
    </Positionable></div>

    <div><Positionable activated="true" stayactive="true">
      <p>You can <em>do</em> this with a bit of React and CSS3 transforms? What...</p>
    </Positionable></div>

    <div><Positionable activated="true" stayactive="true">
      <img src="http://www.myfacewhen.net/uploads/3578-all-the-things.jpg" alt="all the things" />
    </Positionable></div>

  </article>
);

// and finally, load all that stuff.
var target = document.getElementById('app');
React.render(content, target);
