class HanoiView {
  constructor(hanoiGame, $element) {
    this.game = hanoiGame;
    this.$el = $element;

    this.$el.css('height', this.game.towers.flat().length * 60 + 'px');
    console.log(this.game.towers.flat().length * 60);

    this.setupTowers();
    this.render();
    this.clickTower();
  }

  setupTowers() {
    for (let i = 0; i < 3; i++) {
      let $ul = $("<ul></ul>");

      $ul.data("index", i);
      this.$el.append($ul);
    }
  }

  render() {
    
    this.game.towers.forEach((tower, i) => {
      let $tower = $(`ul:nth-child(${i + 1})`);
      $tower.empty();

      tower.forEach((disk) => {
        let $disk = $(`<li></li>`);

        let $dogeHead = $(`<div class='doge head'></div>`);
        let $dogeBody = $(`<div class='doge body'></div>`);
        let $dogeTail = $(`<div class='doge tail'></div>`);
        
        $dogeBody.css("width", disk * 100 - 50 + "px");
        $dogeBody.css("background-size", `${disk * 100 - 50}px 50px`);

        $disk.append($dogeHead);
        $disk.append($dogeBody);
        $disk.append($dogeTail);

        $disk.data("length", disk);
        $tower.append($disk);
      });
    });
  }

  clickTower() {
    this.$el.on("click", "ul", (e) => {
      let $li = $(e.target);
      let $ul = $(e.currentTarget);
      
      if (this.$selectedTower){
        this.endTowerIdx = $ul.data('index');

        if (!this.game.move(this.startTowerIdx, this.endTowerIdx)) {
          alert('Invalid move!')
          return;
        }

        this.render();

        if (this.game.isWon()){
          alert('The computer is telling you how awesome you are.');
          return;
        }

        this.$selectedTower.removeClass('select')
        this.$selectedTower = undefined;
        // this.$selectedDisk.remove()
        // $ul.appendChild(this.$selectedDisk)

      } else {
        this.$selectedTower = $ul;
        this.startTowerIdx = $ul.data('index');
        this.$selectedTower.addClass('select');
        // this.$selectedDisk = $ul.children().last();
      }
    });
  }
}

module.exports = HanoiView;
