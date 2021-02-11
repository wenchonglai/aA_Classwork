class Game

  attr_reader :pegs

  def intialize(num)
   @pegs = [[*(1..num)], [], []]
    
  end

  def move(start, destination)
    return false if @pegs[start].empty?

    start_piece = @pegs[start].first
    end_piece = @pegs[destination].first

    @pegs[destination].unshift(@pegs[start].shift) if start_piece < @pegs[destination].first
  end
end