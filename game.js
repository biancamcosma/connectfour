var game = function(gameID) {
    this.playerA = null;
    this.playerB = null;
    this.id = gameID;
};

game.prototype.hasTwoPlayers = function(){
    return (this.playerA!=null && this.playerB!=null);
}
game.prototype.joined = function(){
    if(this.playerA!=null && this.playerB!=null){
        return "both";
    }
    if(this.playerA!=null){
        return "A Joined";
    }
    if(this.playerB!=null){
        return "B Joined";
    }
}

game.prototype.addPlayer = function(p){
    if(this.playerA==null){
        this.playerA = p;
        return "A";
    }else{
        this.playerB = p;
        return "B";
    }
}
game.prototype.setStatus = function (w) {

    console.assert(typeof w == "string", "%s: Expecting a string, got a %s", arguments.callee.name, typeof w);
    this.gameState = w;
    console.log("[STATUS] %s", this.gameState);
};

module.exports = game;