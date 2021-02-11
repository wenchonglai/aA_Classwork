require_relative '../vendor/cursor'
require_relative "board"
require 'colorize'

class Display
  def initialize(board, cursor)
      @board = board
      @cursor = cursor
  end

  def pretty_print
    background = true

    (0..7).each do |row|
      (0..7).each do |col|
        background_color = background ? :yellow : :light_yellow
        background_color = @cursor.selected ? :light_blue : :light_green if @cursor.cursor_pos == [row, col]
        print @board[[row, col]].to_s.colorize(:color => :black, :background =>  background_color )
        background ^= 1
      end
      puts
      background ^= 1
    end
  end
end

if __FILE__ == $PROGRAM_NAME
  board = Board.new
  # f2, f3 #f = 5
  # e7, e5
  # g2, g4
  # d8, h4
  board.move_piece([1, 5], [2, 5])
  board.move_piece([6, 4], [4, 4])
  board.move_piece([1, 6], [3, 6])
  board.move_piece([7, 3], [3, 7])
  
  display = Display.new(board)
  display.pretty_print
  p board.in_check?(0)
  p board.checkmate?(0)
end
