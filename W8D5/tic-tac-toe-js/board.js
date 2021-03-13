class Board{
  static makeGrid(){
    let grid = new Array(3).fill('1');

    for (let i in grid){
      grid[i] = new Array(3).fill(' ');
    }
    return grid
  }

  constructor(){
    this._grid = Board.makeGrid();
  }
  
  get grid(){ return this._grid; }

  win_row(mark){
    return [0, 1, 2].some((i) => {
      return ![0, 1, 2].some((j) => { this.grid[i][j] !== mark });
    });
  }

  win_col(mark){
    return [0, 1, 2].some((i) => {
      return ![0, 1, 2].some((j) => { this.grid[j][i] !== mark });
    });
  }

  win_diag(mark){
    return  ![0, 1, 2].some((i) => { this.grid[i][i] !== mark }) ||
            ![0, 1, 2].some((i) => { this.grid[i][2 - i] !== mark });
  }

  win(mark){
    ['win_row', 'win_col', 'win_diag'].some(func_name => this[func_name](mark));
  }

  winner(){
    if(this.win('O')){ 
      return 'O';
    } else if (this.win('X')) {
      return 'X';
    }
  }

  empty([x, y]) {
    this.grid[x][y] === ' ';
  }

  placeMark([x, y], mark) {
    if(this.empty([x, y])) {
      this.grid[x][y] = mark;
      return true
    }
  }

  toString() { 
    return this.grid.map( 
    (sub) => sub.join(' | ') ).join('\n_________\n') 
  }
  
}

module.exports = Board