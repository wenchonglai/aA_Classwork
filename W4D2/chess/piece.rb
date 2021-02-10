require 'singleton'

class Piece
  SYMBOL = :⚑
  def nil?
    false
  end
  def pretty_print
    print self.class::SYMBOL.to_s + ' '
  end
end

class NullPiece < Piece
  include Singleton
  SYMBOL = :_
  def nil?
    true
  end
end