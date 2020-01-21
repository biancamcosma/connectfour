var createError = require('http-errors');
var express = require('express');
var http = require("http");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var websocket = require("ws");
var indexRouter = require('./routes/index');
var Game = require("./game");
var gameStatus = require("./stats");
var app = express();
var cookies = require("cookie-parser");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get("/play", indexRouter);
app.use(express.static(path.join(__dirname, 'public')));
app.get("/", (req, res) => {
  res.render("splash.ejs", { gamesInitialized: gameStatus.gamesInitialized, gamesCompleted: gameStatus.gamesCompleted});
});

//app.get('/', indexRouter);
var server = http.createServer(app).listen(process.env.PORT || 3000);
const wss = new websocket.Server({ server });
var websockets = {};//property: websocket, value: game

console.log("Server started!");

setInterval(function() {
  for(let i in websockets){
      if(websockets.hasOwnProperty(i)){
          let gameObj = websockets[i];
          //if the gameObj has a final status, the game is complete/aborted
          if(gameObj.finalStatus!=null){
              console.log("\tDeleting element "+i);
              delete websockets[i];
          }
      }
  }
}, 50000);
var connectionID = 0;//each websocket receives a unique ID
var currentGame = new Game(gameStatus.gamesInitialized);


wss.on('connection', function connection(ws){
    let con = ws; 
    con.id = connectionID++;
    let playerType = currentGame.addPlayer(con);
    websockets[con.id] = currentGame;

    console.log("Player %s placed in game %s as %s", con.id, currentGame.id, playerType);
     /*
     * inform the client about its assigned player type
     */ 
    

    if(currentGame.hasTwoPlayers()){
      console.log("2 connected, let's start the game!");
      gameStatus.gamesInitialized++;
    }

    
  
    con.on("close", function (code) {
      
      /*
       * code 1001 means almost always closing initiated by the client;
       * source: https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent
       */
      console.log(con.id + " disconnected ...");

      if (code == "1001") {
          /*
          * if possible, abort the game; if not, the game is already completed
          */
          let gameObj = websockets[con.id];
            if(won==false){
              gameStatus.gamesAborted++;
              console.log("Game Aborted!");
            }

              /*
               * determine whose connection remains open;
               * close it
               */
              try {
                  gameObj.playerA.close();
                  gameObj.playerA = null;
              }
              catch(e){
                  console.log("Player A closing: "+ e);
              }

              try {
                  gameObj.playerB.close(); 
                  gameObj.playerB = null;
              }
              catch(e){
                  console.log("Player B closing: " + e);
              }                
      }
    });
           
});


