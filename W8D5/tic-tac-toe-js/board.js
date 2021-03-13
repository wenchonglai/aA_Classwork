class Board{
  static makeGrid(){
    grid = new Array(3);

    for (let i in grid){
      grid[i] = new Array(3);
    }
  }

  constructor(){
    this._grid = Board.makeGrid();
  }
  
  get grid(){ return this._grid; }

  win_row(color){
    return [0, 1, 2].some((i) => {
      return ![0, 1, 2].some((j) => { this.grid[i][j] !== color });
    });
  }

  win_col(color){
    return [0, 1, 2].some((i) => {
      return ![0, 1, 2].some((j) => { this.grid[j][i] !== color });
    });
  }

  win_diag(color){
    return  ![0, 1, 2].some((i) => { this.grid[i][i] !== color }) ||
            ![0, 1, 2].some((i) => { this.grid[i][2 - i] !== color });
  }

  win(color){
    ['win_row', 'win_col', 'win_diag'].some(func_name => this[func_name]());
  }
}