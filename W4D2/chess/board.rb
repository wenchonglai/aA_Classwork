require_relative "piece"

class Board

  def initialize
    @rows = Array.new(8){Array.new(8){NullPiece.instance}}
  end

  def [](pos)
    row, col = pos
    @rows[row][col]
  end

  def []=(pos, val)
    row, col = pos
    @rows[row][col] = val
  end

  def move_piece(start_pos, end_pos)
    start_piece = self[start_pos]

    raise "The starting position is empty" if start_piece.nil?  
    unless start_piece.valid_moves.include?(end_pos)            
      raise "Cannot make the move from #{start_pos} to #{end_pos}" 
    end

    if self[end_pos].nil? #NullPiece
      self[start_pos], self[end_pos] = self[end_pos], start_piece
    else
      self[end_pos], self[start_pos] = start_piece, NullPiece.instance
    end
  end

  def pretty_print
    @rows.each do |row|
      row.each do |piece|
        piece.pretty_print
      end
      puts
    end
  end
end

#♖♜♘♞♗♝♔♚♕♛♟♙ 

if __FILE__ == $PROGRAM_NAME
  b = Board.new
  b[[0, 0]] = Piece.new
  b.pretty_print
  p b
  # b.move_piece([5,5], [6,6]) #raises error
  b.move_piece([0,0], [1,1]) #raises NoMethodError
end