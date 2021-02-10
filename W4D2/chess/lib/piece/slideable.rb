module Slideable
  private
  HORIZONTAL_DIRS = [[1, 0], [0, 1], [-1, 0], [0, -1]]

  private
  DIAGONAL_DIRS = [[1, 1] , [-1, 1], [-1, -1], [1, -1]]

  private
  def move_dirs

  end

  private
  def grow_unblocked_moves_in_dir(dx , dy)
    moves = []
    x, y = @pos
    i = 1 
    while i < 8
      temp_pos = [x + i*dx, y + i*dy]
      break unless @board[temp_pos].empty?
      moves << temp_pos
      break if @board[temp_pos].enemy?(self) 
      i += 1
    end

    moves
  end

  def moves(direction)
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
      arr << grow_unblocked_moves_in_dir(*direction)
    end
    arr 
  end

  def horizontal_dirs  
    HORIZONTAL_DIRS
  end

  def diagonal_dirs  
    DIAGONAL_DIRS
  end

end