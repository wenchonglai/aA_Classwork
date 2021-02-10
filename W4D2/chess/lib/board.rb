require_relative "piece"
require_relative "piece/bishop.rb"
require_relative "piece/king.rb"
require_relative "piece/knight.rb"
require_relative "piece/pawn.rb"
require_relative "piece/queen.rb"
require_relative "piece/rook.rb"

class Board
    attr_reader :rows
  def initialize
    @rows = Array.new(8){Array.new(8) {NullPiece.instance}}
    
    pieces = [Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook]

    (0..7).each do |i|
      @rows[0][i] = pieces[i].new(0, self, [0, i])
      @rows[5][i] = Pawn.new(0, self, [1, i]) #remember to change back!
      @rows[6][i] = Pawn.new(1, self, [6, i])
      @rows[7][i] = pieces[i].new(1, self, [7, i])
    end
  end

  def [](pos)
    row, col = pos
    @rows[row][col]
  end

  def []=(pos, val)
    row, col = pos
    @rows[row][col] = val
  end

  def valid?(pos)
    x, y = pos
    x >= 0 && y >= 0 && x < 8 && y < 8
  end

  def move_piece(start_pos, end_pos)
    start_piece = self[start_pos]
    end_piece = self[end_pos]

    raise "The starting position is empty" if start_piece.nil? 

    unless start_piece.valid_moves.include?(end_pos)            
      raise "Cannot make the move from #{start_pos} to #{end_pos}" 
    end

    if self[end_pos].nil? #NullPiece
      self[start_pos], self[end_pos] = end_piece, start_piece
      start_piece.pos = end_pos
      end_piece.pos = end_pos
    else
      self[end_pos], self[start_pos] = start_piece, NullPiece.instance
      start_piece.pos = end_pos
    end
  end

end
#♖♜♘♞♗♝♔♚♕♛♟♙ 

if __FILE__ == $PROGRAM_NAME
  b = Board.new
  b.pretty_print
  b.move_piece([0,0],[3,0])
  b.move_piece([0,1],[2,2])
  b.move_piece([0,2],[2,0])
  b.move_piece([0,3],[4,7])
  b.move_piece([0,4],[1,3])
  b.move_piece([0,5],[4,1])
  b.move_piece([0,6],[2,7])
  b.move_piece([0,7],[1,7])
  b.move_piece([6,0],[5,1])
  b.move_piece([5,1],[5,1])
  b.pretty_print
end