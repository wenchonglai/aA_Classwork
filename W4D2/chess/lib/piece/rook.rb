require_relative "../piece"
require_relative "slideable"

class Rook < Piece 
  include Slideable
  SYMBOL = :♜♖
  
  private
  def move_dirs
    horizontal_dirs
  end

end