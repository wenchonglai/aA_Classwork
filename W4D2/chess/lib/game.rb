require_relative '../vendor/cursor'
require_relative "board"
require_relative "display"

class Game
  def initialize
    @board = Board.new
    @cursor = Cursor.new([0, 0], @board)
    @players = [Player.new('player 1', 0), Player.new('player 2', 1)]
    @display = Display.new(@board, @cursor)
  end

  def current_player
    @players.first
  end

  def play
    count = 0

    until self.game_over?
      system "clear"
      @display.pretty_print

      begin
        if self.current_player.make_move(@cursor)
          @players << @players.shift 
        end
      rescue => error
        p [count, error]
        retry
      end
    end
  end
  def game_over?
    false
  end
end

class Player
  attr_reader :name, :color
  def initialize(name, color)
    @name = name
    @color = color
  end

  def make_move(cursor)
    cursor.get_input(self)
  end
end

if __FILE__ == $PROGRAM_NAME
  game = Game.new
  game.play
end