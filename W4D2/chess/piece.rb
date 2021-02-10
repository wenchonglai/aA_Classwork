require 'singleton'
module Stepable

  def moves 
    arr = []
    self.move_diffs.each do |direction|
      arr << direction unless @board[direction].color == @color
    end
    arr
  end

end


module Slideable
  private
  HORIZONTAL_DIRS = [[1, 0], [0, 1], [-1, 0], [0, -1]]

  private
  DIAGONAL_DIRS = [[1, 1] , [-1, 1], [-1, -1], [1, -1]]

  private
  def move_dirs

  end

  private
  def grow_unblocked_moves_in_dir(dx , dy)
    moves = []
    x, y = @pos
    i = 1 
    while i < 8
      temp_pos = [x + i*dx, y + i*dy]
      break unless @board[temp_pos].empty?
      moves << temp_pos
      i += 1
    end

    moves
  end

  def moves(direction)
    # case direction
    # when :horizontal
    #   self.horizontal_dirs
    # when :diagonal
    #   self.diagonal_dirs
    # when :both
    #   [*self.horizontal_dirs, *self.diagonal_dirs]
    # end
    arr = []
    move_dirs.each do |direction|
      arr << grow_unblocked_moves_in_dir(*direction)
    end
    arr 
  end

  def horizontal_dirs  
    HORIZONTAL_DIRS
  end

  def diagonal_dirs  
    DIAGONAL_DIRS
  end

end

class Piece
  SYMBOL = :XX

  def initialize(color, board, pos)
    @color = color
    @board = board
    @pos = pos
  end


  def empty?
    false
  end

  def valid_moves
    moves = []
  end

  def pos=(val)
    @board[@pos] = NullPiece.instance
    @board[val] = self
    @pos = val
  end

  def symbol  
    self.class::SYMBOL[@color]
  end

  def to_s
     self.symbol.to_s + ' '
  end

  private
  def move_into_check?(end_pos)

  end
  
end

class NullPiece < Piece
  include Singleton
  SYMBOL = :_
  def initialize
  end
  def empty?
    true
  end
end


class Rook < Piece 
  include Slideable
  SYMBOL = :♜♖
  
  private
  def move_dirs
    self.horizontal_dirs
  end

end

class Bishop < Piece 
  include Slideable
  SYMBOL = :♝♗
  
  private
  def move_dirs
    self.diagonal_dirs
  end

end

class Queen < Piece 
  include Slideable
  SYMBOL = :♛♕
  
  private
  def move_dirs
    self.horizontal_dirs + self.diagonal_dirs
  end

end

class Knight < Piece 
  include Stepable
  SYMBOL = :♞♘
  
  private
  def move_diffs
    [[2, 1], [2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2], [-2, 1], [-2, -1]]
  end

end

class King < Piece 
  include Slideable
  SYMBOL = :♚♔
  
  private
  def move_dirs
    self.horizontal_dirs + self.diagonal_dirs
  end

end

class Pawn < Piece 
  include Slideable
  SYMBOL = :♟♙
  
  private
  def move_dirs
    self.horizontal_dirs
  end

end



