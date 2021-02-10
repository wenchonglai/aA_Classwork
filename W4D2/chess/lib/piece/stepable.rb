module Stepable

  def moves 
    arr = []
    self.move_diffs.each do |direction|
      arr << direction unless @board[direction].color == @color
    end
    arr
  end

end