var createError = require('http-errors');
var express = require('express');
var http = require("http");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var websocket = require("ws");
var indexRouter = require('./routes/index');
var app = express();
var cookies = require("cookie-parser");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get("/play", indexRouter);
app.use(express.static(path.join(__dirname, 'public')));
app.get("/", (req, res) => {
  res.render("splash.ejs", { gamesInitialized: Math.floor(connections/2), playersConnected: connections});
});

//app.get('/', indexRouter);
var server = http.createServer(app).listen(process.env.PORT || 3001);
const wss = new websocket.Server({ server });

console.log("Server started!");

var connections = 0;

wss.on('connection', function connection(ws){
    let con = ws; 
    connections++;

    console.log(
      "Player %s placed in game %s as %s"
    );
  
});
