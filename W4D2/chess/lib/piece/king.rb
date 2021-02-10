require_relative "../piece"
require_relative "stepable"

class King < Piece 
  include Stepable
  SYMBOL = :♚♔
  
  private
  def move_dirs
    self.horizontal_dirs + self.diagonal_dirs
  end

end