require_relative '../vendor/cursor'
require_relative "board"
require 'colorize'

class Display
    def initialize(board)
        @board = board
        @cursor = Cursor.new([0, 0], board)
    end

    def pretty_print
    p '-' * 16
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
    display = Display.new(Board.new)
    display.pretty_print
end
