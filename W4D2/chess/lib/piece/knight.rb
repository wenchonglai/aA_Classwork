require_relative "../piece"
require_relative "stepable"

class Knight < Piece 
  include Stepable
  SYMBOL = :♞♘
  
  private
  def move_diffs
    [[2, 1], [2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2], [-2, 1], [-2, -1]]
  end

end