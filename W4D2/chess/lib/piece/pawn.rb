require_relative "../piece"

class Pawn < Piece 
  
  SYMBOL = :♟♙
  def initialize
    @at_start_row = true
  end

  def moves
    (forward_steps + side_attacks).map do |pos|
        [self.pos[0] + pos[0], self.pos[1] + pos[1]]
    end
  end


  private

  def at_start_row?
    @at_start_row
  end

  def forward_dir
    @color.zero? ? -1 : 1
  end

  def forward_steps
    self.at_start_row? ? [[self.forward_dir, 0],[self.forward_dir*2, 0]] : [[self.forward_dir, 0]]
  end

  def side_attacks
    [[self.forward_dir, 1], [self.forward_dir, -1]].reject do |pos|
        x, y = pos
        piece = @board[self.pos[0] + x, self.pos[1] + y]
        self.enemy?(piece)
    end
  end

end