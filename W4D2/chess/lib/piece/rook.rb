require_relative "../piece"
require_relative "slideable"

class Rook < Piece 
  include Slideable
  SYMBOL = :♜♖
  
  private
  def move_dirs
    self.horizontal_dirs
  end

end