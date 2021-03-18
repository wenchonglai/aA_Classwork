class View {
  constructor(game, $el) {
    $el.append(this.setupBoard());
    $el.addClass('not-over')
    this.game = game;
    this.$el = $el;


    this.bindEvents();
  }

  bindEvents() {
    this.$el.on("click", (e) => {
      if (this.game.isOver()) return;

      let $square = $(e.target);

      if ($square.hasClass("o") || $square.hasClass("x"))
        return alert("Can not place here.");

      let i = $square.data("index");
      let x = Math.floor(i / 3),
        y = i % 3;

      this.makeMove($square);
      this.game.playMove([x, y]);

      if (this.game.isOver()) {
        this.$el.removeClass('not-over')
        if (!this.game.winner()) {
          return this.$el.append(`<p>It is a tie!</p>`);
        }
        this.$el.addClass(this.game.winner())
        return this.$el.append(`<p>You win ${this.game.winner()}</p>`);
      }
    });
  }

  makeMove($square) {
    $square.removeClass("hidden");
    $square.addClass(this.game.currentPlayer);
  }

  setupBoard() {
    let $ul = $("<ul></ul>");

    for (let i = 0; i < 9; i++) {
      let $li = $(`<li data-index="${i}"></li>`);
      $li.addClass("hidden");
      $ul.append($li);
    }

    return $ul;
  }
}

module.exports = View;
