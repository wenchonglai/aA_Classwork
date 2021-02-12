class Deck
  
  attr_reader :count, :cards

  def initialize
    @cards = []
    @count = 0
  end

  def push(card)
    value = card.value
    return false if @cards.any?{|card| card.value == value}
    @cards << card
    @count += 1
  end

  def pop
    @count -= 1
    @cards.pop
  end

  def shuffle
    @cards.shuffle!
  end

end