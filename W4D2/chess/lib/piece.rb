require 'singleton'

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
    moves
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

  end
  
  protected
  attr_reader :color, :board, :pos
end

class NullPiece < Piece
  include Singleton

  def initialize
    super(0, nil, nil)
  end

  def to_s
    '_ '
  end

  def empty?
    true
  end
end





