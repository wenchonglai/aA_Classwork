class Game

  attr_reader :pegs

  def initialize(num)
    @pegs = [[*(1..num)], [], []]
    @length = num
    #self.move
  end

  def get_input
    until self.won?
      self.prettyprint
      p "Enter start and destination pegs (i.e. 1, 2):"

      start, destination = gets.chomp.split(/[\ \,\;]+/).map{|s| s.to_i}

      if self.valid_move?(start, destination)
        self.move(start, destination)
      else
        p "Invalid input! Enter again or you'll be imprisoned in the temple in Hanoi."
      end
    end

    self.game_over
  end

  def move (start, destination)
    @pegs[destination].unshift(@pegs[start].shift) 
  end

  def valid_move?(pos_1, pos_2)
    return false if @pegs[pos_1].nil? ||
      @pegs[pos_2].nil? ||
      @pegs[pos_1].empty? ||
      (!@pegs[pos_2].empty? && @pegs[pos_1].first > @pegs[pos_2].first)
    true
  end

  def won?
    return true if @pegs[1..-1].any?{|peg| peg.length == @length}
    false
  end

  def prettyprint 
    @pegs.each do |peg|
      puts "|" +  peg.reverse.join("-")  
    end

    puts 
  end

  def game_over
    # if self.won? == true
    print "you won"
    # end
  end
end

if __FILE__ == $PROGRAM_NAME
  game = Game.new(2)
end