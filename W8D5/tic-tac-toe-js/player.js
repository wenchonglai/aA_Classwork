let readline = require("readline");


let reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Player {
    constructor(mark, game) {
        this.mark = mark;
        this.game = game;
    }

    respond(pos) {
        this.game.receive(pos, this.mark);
    }
}

class HumanPlayer extends Player {
    

    getPrompt() {
        let callback = (answer) => {
            this.respond(
                answer.split(/[\s\D]+/).map( 
                    (x) => parseInt(x)));
                }
        reader.question("Select a position: ", callback.bind(this));
        
    }
}

module.exports = { Player, HumanPlayer }