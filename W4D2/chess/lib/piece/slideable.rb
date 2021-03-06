module Slideable
  def moves
    # case direction
    # when :horizontal
    #   self.horizontal_dirs
    # when :diagonal
    #   self.diagonal_dirs
    # when :both
    #   [*self.horizontal_dirs, *self.diagonal_dirs]
    # end
    arr = []

    move_dirs.each do |direction|
      arr += grow_unblocked_moves_in_dir(*direction)
    end
    arr 
  end

  def horizontal_dirs  
    HORIZONTAL_DIRS
  end

  def diagonal_dirs  
    DIAGONAL_DIRS
  end

  private
  HORIZONTAL_DIRS = [[1, 0], [0, 1], [-1, 0], [0, -1]]

  DIAGONAL_DIRS = [[1, 1] , [-1, 1], [-1, -1], [1, -1]]

  def move_dirs

  end

  def grow_unblocked_moves_in_dir(dx , dy)
    moves = []
    x, y = @pos
    i = 1 
    while i < 8
      temp_pos = [x + i * dx, y + i * dy]
      break unless @board.valid?(temp_pos) && ( @board[temp_pos].empty? || board[temp_pos].enemy?(self))
      moves << temp_pos
      break if @board[temp_pos].enemy?(self) 
      i += 1
    end

    moves
  end

end