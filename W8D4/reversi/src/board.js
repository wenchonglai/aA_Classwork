// DON'T TOUCH THIS CODE
if (typeof window === 'undefined'){
  var Piece = require("./piece");
}
// DON'T TOUCH THIS CODE

/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4]
 */
function _makeGrid (width, height) {
  let grid = new Array(height)
    .fill(1)
    .map( () => new Array(width) );

  grid[3][4] = new Piece('black');
  grid[4][3] = new Piece('black');
  grid[3][3] = new Piece('white');
  grid[4][4] = new Piece('white');

  return grid;
}

/**
 * Constructs a Board with a starting grid set up.
 */
function Board (width=8, height=8) {
  this.grid = _makeGrid(width, height);
  this.width = width;
  this.height = height;

}

Board.DIRS = [
  [ 0,  1], [ 1,  1], [ 1,  0],
  [ 1, -1], [ 0, -1], [-1, -1],
  [-1,  0], [-1,  1]
];

/**
 * Checks if a given position is on the Board.
 */
Board.prototype.isValidPos = function (pos) {
  let [x, y] = pos;

  return x >= 0 && x < this.height && y >= 0 && y < this.width;
};

/**
 * Returns the piece at a given [x, y] position,
 * throwing an Error if the position is invalid.
 */
Board.prototype.getPiece = function (pos) {
  if (!this.isValidPos(pos)){
    throw new Error('Not valid pos!');
  }

  return this.grid[pos[0]][pos[1]]
};

/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function (pos, color) {
  let piece = this.getPiece(pos);
  return piece && piece.color === color;
};

/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function (pos) {
  return !!this.getPiece(pos)
};

// Board.DIRS = [
//   [ 0,  1], [ 1,  1], [ 1,  0],
//   [ 1, -1], [ 0, -1], [-1, -1],
//   [-1,  0], [-1,  1]
// ];

/**
 * Recursively follows a direction away from a starting position, adding each
 * piece of the opposite color until hitting another piece of the current color.
 * It then returns an array of all pieces between the starting position and
 * ending position.
 *
 * Returns an empty array if it reaches the end of the board before finding another piece
 * of the same color.
 *
 * Returns empty array if it hits an empty position.
 *
 * Returns empty array if no pieces of the opposite color are found.
 */
Board.prototype._positionsToFlip = function(pos, color, dir, piecesToFlip){
  let arr = [];
  let [x, y] = pos;

  while (
    (x += dir[0]) >= 0 && x < this.height &&
    (y += dir[1]) >= 0 && y < this.width
  ) {
    let piece = this.getPiece([x, y]);
    
    if (!piece) return [];

    if (piece.color === color) return arr;

    if (piece.oppColor() === color) arr.push([x, y]);
  }

  return [];
};

/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 */
Board.prototype.validMove = function (pos, color) {
  if (this.isOccupied(pos))
    return false;

  for (let dir of Board.DIRS) 
    if (this._positionsToFlip(pos, color, dir).length > 0)
      return true;

  return false;
};

/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function (pos, color) {
  if (!this.validMove(pos, color)) throw new Error("Invalid move!");

  let arr = [];

  for (let dir of Board.DIRS) {
    arr.push(...this._positionsToFlip(pos, color, dir));
  }

  for (let pos of arr)
    this.getPiece(pos).flip();

  this.grid[pos[0]][pos[1]] = new Piece(color);
  return arr;
};

/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function (color) {
  let arr = [];

  for (let i = 0; i < this.height; i ++)
    for (let j = 0; j < this.width; j ++)
      if ( this.validMove([i, j], color) )
        arr.push([i, j]);
  
  return arr;
};

/**
 * Checks if there are any valid moves for the given color.
 */
Board.prototype.hasMove = function (color) {
  return this.validMoves(color).length > 0
};



/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function () {
  return !this.hasMove("white") && !this.hasMove("black")
};




/**
 * Prints a string representation of the Board to the console.
 */
Board.prototype.print = function () {
};


// DON'T TOUCH THIS CODE
if (typeof window === 'undefined'){
  module.exports = Board;
}
// DON'T TOUCH THIS CODE