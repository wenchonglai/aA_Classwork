let readline = require('readline');
let Board = require('./board');
let {Player, HumanPlayer} = require('./player');

let reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Game {
    constructor(...players) {
        this.players = players;
        this.players.forEach( (player) => {
            player.game = this;
        });
        this.currentPlayerIndex = 0;
        this.board = new Board();
    }

    switch() {
        this.currentPlayerIndex += 1;
        this.currentPlayerIndex %= this.players.length;
    }

    get currentPlayer() {
        return this.players[this.currentPlayerIndex];
    }

    takeTurn() {
        this.currentPlayer.getPrompt();
    }

    receive(pos, mark) {
        let validResponse = this.board.placeMark(pos, mark);
        if(validResponse) { 
            console.log(this.board.toString());
            if(this.board.win(mark)){
                console.log(`${mark} wins!`);
            } else {
                this.switch();
                console.log(`${mark}'s turn`);
            }
        }
        this.takeTurn()
    }

    run() {
        console.log(this.board.toString());
        this.takeTurn();
    }
}

game = new Game(new HumanPlayer('O'), new HumanPlayer('X'));
game.run();