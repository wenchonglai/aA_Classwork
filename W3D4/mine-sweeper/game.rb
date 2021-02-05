require_relative "board"

class Game
  DIFFICULTY_LEVELS = {
    :easy => [9, 10],
    :medium => [15, 25],
    :hard => [25, 100]
  }
  def initialize(difficulty_level = :easy)
    @board = nil
    @difficulty_level = difficulty_level
    self.reset
  end

  def reset
    @board = Board.new(*DIFFICULTY_LEVELS[@difficulty_level])
  end

  def game_over?
    @board.game_over?
  end

  def play
    until self.game_over?
      @board.render
      print "input action and position (i.e. s 1 1):"
      input = gets.chomp.split

      until valid?(input)
        print "invalid input! enter again:"
        input = gets.chomp.split
      end
    end

    @board.reveal_all
    @board.render
    print "Game Over!"
  end

  def valid?(input)
    action, x, y = input
    pos = [x, y].map(&:to_i)
    
    return false unless @board.valid?(pos)

    case action
    when "s"
      @board.sweep(pos)
    when "f"
      @board.flag(pos)
    when "u"
      @board.unflag(pos)
    else
      return false
    end

    true
  end
end

if __FILE__ == $PROGRAM_NAME
  g = Game.new
  g.play
end