function StatusBar(){
    this.setStatus = function(status){
        document.getElementById("statusbar").innerHTML = status;
    };
}
function GameState(sb, socket){

}
    
    this.makeMove = function(){
            
    }


(function setup(){
    waiting.volume = 0.10;
    waiting.loop = true;
    var socket = new WebSocket("ws://localhost:3000");
    var players = {};
    var whoWon = null;
    players["A"] = 0;
    players["B"] = 0;
    gameBoard(players["A"],players["B"]);
   
    var sb = new StatusBar();
    var gs = new GameState(sb, socket);

    socket.onmessage = function (event) {

    }


    socket.onopen = function(){
        socket.send("{}");
    };
    
    //server sends a close event only if the game was aborted from some side
    socket.onclose = function(){
        "close!"
        if(whoWon==null){
            sb.setStatus(Status["aborted"]);
        }
    };

    socket.onerror = function(){  
    };
})(); //execute immediately