require_relative 'tic_tac_toe'

class TicTacToeNode
  attr_reader :board, :next_mover_mark, :prev_move_pos
  def initialize(board, next_mover_mark, prev_move_pos = nil)
    @board = board
    @next_mover_mark = next_mover_mark
    @prev_move_pos = prev_move_pos
  end

  def losing_node?(evaluator)
    #base case
      #return true if board.over? && board.winner != @next_mover_mark
    if @board.over?
      return board.won? && board.winner != evaluator 
    end

    #recursive case
    if evaluator == @next_mover_mark 
      self.children.all? { |children| children.losing_node?(evaluator) }
    else
      self.children.any? { |children| children.losing_node?(evaluator) }
    end
  end
# node; next_mark = x; eval = x
#x _ _
#o _ _
#x o _

# child_i; next_mark = o, prev_pos = [1, 1]; eval = x
#x _ _
#o x _
#x o _

# grand_child_i2; next_mark = x, prev_pos = ???; eval = x
#x o _
#o x _
#x o _

# great_grand_child_i3; next_mark = o, prev_pos = ???; eval = x
#x o _
#o x _
#x o _

  def winning_node?(evaluator)
    if @board.over?
      return board.won? && board.winner == evaluator 
    end

    #recursive case
    if evaluator == @next_mover_mark 
      self.children.any? { |children| children.winning_node?(evaluator) }
    else
      self.children.all? { |children| children.winning_node?(evaluator) }
    end
  end

  # This method generates an array of all moves that can be made after
  # the current move.
  def children
    children = []

    (0...3).each do |row_idx|
      (0...3).each do |col_idx|
        pos = [row_idx, col_idx]

        next unless @board.empty?(pos)    #next unless?
        
        new_board = board.dup
        new_board[pos] = self.next_mover_mark
        next_mover_mark = ( self.next_mover_mark == :x ? :o : :x )
        children << TicTacToeNode.new(new_board, next_mover_mark, pos)
      end
    end

    children
  end
end
