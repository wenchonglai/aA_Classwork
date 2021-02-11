require_relative "piece"
require_relative "piece/bishop.rb"
require_relative "piece/king.rb"
require_relative "piece/knight.rb"
require_relative "piece/pawn.rb"
require_relative "piece/queen.rb"
require_relative "piece/rook.rb"

require "byebug"
class Board
    attr_reader :rows
  def initialize
    @rows = Array.new(8){Array.new(8) {NullPiece.instance}}
    @cache = []
    pieces = [Rook, Knight, Bishop, Queen, King, Rook, Knight, Bishop] #change back!

    (0..7).each do |i|
      @rows[0][i] = pieces[i].new(0, self, [0, i])
      @rows[5][i] = Pawn.new(0, self, [5, i])
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

  def select_piece(pos, color)
    piece = self[pos]

    if @cache.empty? 
      raise "#{color} cannot move a null piece" if piece.is_a?(NullPiece)
      raise "#{color} cannot move an enemy piece #{piece.color}" if piece.color != color
    end
    
    @cache << pos
    
    if @cache.length == 2
      c = [*@cache]
      @cache.clear
      self.move_piece(*c)
      return true
    end

    false
  end

  def preview(start_pos, end_pos)
    start_piece = self[start_pos]
    end_piece = self[end_pos]
    # p "previewing moving from #{start_pos} to #{end_pos}"
    if self[end_pos].nil? #NullPiece
      self[start_pos], self[end_pos] = end_piece, start_piece
      start_piece.pos = end_pos
      # end_piece.pos = start_pos
    else
      self[end_pos], self[start_pos] = start_piece, NullPiece.instance
      start_piece.pos = end_pos
    end
    return end_piece  
  end

  def undo(new_pos, orig_pos, end_piece)
    # p "undoing moving from #{new_pos} to #{orig_pos}"
    # end_piece.pos = orig_pos
    start_piece = self[new_pos]
    self[new_pos], self[orig_pos] = end_piece, self[new_pos]
    start_piece.pos = orig_pos
  end

  def move_piece(start_pos, end_pos, valid_only=true)
    start_piece = self[start_pos]
    end_piece = self[end_pos]
    # p "moving from #{start_pos} to #{end_pos}"
    raise "#{start_piece.color} the starting position is empty" if start_piece.nil? 
    moves = valid_only ? start_piece.valid_moves : start_piece.moves
    unless moves.include?(end_pos)            
      raise "#{start_piece.color} cannot make the move from #{start_pos} to #{end_pos}" 
    end

    if self[end_pos].nil? #NullPiece
      self[start_pos], self[end_pos] = end_piece, start_piece
      start_piece.pos = end_pos
      end_piece.pos = start_pos
    else
      self[end_pos], self[start_pos] = start_piece, NullPiece.instance
      start_piece.pos = end_pos
    end
  end

  def select(&prc)
    arr = []

    (0..7).each do |row|
      (0..7).each do |col|
        arr << self[[row, col]] if prc.call(self[[row, col]])
      end
    end

    arr
  end

  def find_king(color)
    self.select{|piece| piece.is_a?(King) && color == piece.color}.first
  end

  def find_all(color)
    self.select{|piece| color == piece.color}
  end

  def in_check?(color)
    # 1. find the king position
    # 2. find all possible movements of the enemy pieces
    # 3. check if any of the aforementioned movements overlaps the king's position

    king_pos = self.find_king(color).pos
    enemies = self.find_all(color ^ 1)
    enemies.any? {|enemy| enemy.moves.include?(king_pos)}
  end
  
  def checkmate?(color)
    return false unless self.in_check?(color)

    my_pieces = self.find_all(color)
    my_pieces.all?{|piece| piece.valid_moves.empty?}
    # real checkmate:
    # 1. get all valid moves of all pieces on our side
    # 2. iterate through the valid moves
    # 2.1 "tentatively" move a piece to that spot
    # 2.2 find all possible movements of the enemy pieces after the tentative move
    # 3 check in this case whether potential enemy movements still cover the king's most current position
  end
end
#♖♜♘♞♗♝♔♚♕♛♟♙ 

# if __FILE__ == $PROGRAM_NAME
#   b = Board.new
#   b.move_piece([0,0],[3,0])
#   b.move_piece([0,1],[2,2])
#   b.move_piece([0,2],[2,0])
#   b.move_piece([0,3],[4,7])
#   b.move_piece([0,4],[1,3])
#   b.move_piece([0,5],[4,1])
#   b.move_piece([0,6],[2,7])
#   b.move_piece([0,7],[1,7])
#   b.move_piece([6,0],[5,1])
#   b.move_piece([5,1],[5,1])
#   b.pretty_print
# end