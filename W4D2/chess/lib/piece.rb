require 'singleton'

class Piece
  SYMBOL = :XX

  attr_reader :color, :pos

  def initialize(color, board, pos)
    @color = color
    @board = board
    @pos = pos
  end

  def empty?
    false
  end

  def valid_moves
    moves.reject { |move| move_into_check?(move) }
  end

  def pos=(val)
    # @board[@pos] = NullPiece.instance
    @board[val] = self
    @pos = val
  end

  def symbol  
    self.class::SYMBOL[@color]
  end

  def to_s
     self.symbol.to_s + ' '
  end

  def enemy?(piece)
    !piece.empty? && !self.empty? && self.color != piece.color
  end

  private
  def move_into_check?(end_pos)
    cache = [@pos.dup, end_pos.dup] 
    end_piece = @board.preview(@pos, end_pos)
    in_check = @board.in_check?(@color)
    @board.undo(*cache.reverse, end_piece)
    return in_check
  end
  
  protected
  attr_reader :board
end

class NullPiece < Piece
  include Singleton

  def initialize
    super(-1, nil, nil)
  end

  def to_s
    '  '
  end

  def empty?
    true
  end

  def moves
    []
  end
end





