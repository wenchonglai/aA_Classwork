require_relative "../piece"

class Pawn < Piece 
  
  SYMBOL = :♟♙
  def initialize(color, board, pos)
    @starting_row = pos[0] #starting row at initalize
    super # super <==> super(color, board, pos)
  end

  def moves
    (forward_steps + side_attacks).map do |pos|
        [self.pos[0] + pos[0], self.pos[1] + pos[1]]
    end
  end

  private
  def at_start_row?
    @pos[0] == @starting_row
  end

  def forward_dir
    @color.zero? ? 1 : -1
  end

  def forward_steps
    i = 1
    moves = []

    while i <= ( at_start_row? ? 2 : 1 )
      x, y = @pos
      temp_pos = [x + forward_dir * i, y]
      break unless @board.valid?(temp_pos) && @board[temp_pos].empty? 
      moves << temp_pos
      i += 1
    end

    moves 
  end

  def side_attacks
    [[forward_dir, 1], [forward_dir, -1]].select do |pos|
        x, y = pos
        piece = @board[[@pos[0] + x, @pos[1] + y]]
        self.enemy?(piece)
    end
  end

end