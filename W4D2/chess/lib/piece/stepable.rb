module Stepable

  def moves 
    arr = []
    move_diffs.each do |direction|
      pos = [@pos[0] + direction[0], @pos[1] + direction[1]]
      arr << pos if @board.valid?(pos) && ( @board[pos].empty? || @board[pos].enemy?(self) )
    end

    arr
  end

end